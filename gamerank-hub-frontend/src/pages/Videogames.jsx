import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';

function Videogames() {
    const [videogames, setVideogames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Estados para filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [sortBy, setSortBy] = useState('recent');
    
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchVideogames();
    }, [location]);

    useEffect(() => {
        applyFilters();
    }, [videogames, searchTerm, selectedGenre, selectedYear, sortBy]);

    const fetchVideogames = async () => {
        try {
            setLoading(true);
            const response = await api.get('/videogames');
            
            let games = [];
            
            if (Array.isArray(response.data.data)) {
                games = response.data.data;
            } else if (response.data.data && response.data.data.data) {
                games = response.data.data.data;
            } else if (Array.isArray(response.data)) {
                games = response.data;
            }
            
            setVideogames(games);
            setFilteredGames(games);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar videojuegos:', error);
            setError('Error al cargar los videojuegos');
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...videogames];

        // Filtro de búsqueda por título
        if (searchTerm) {
            filtered = filtered.filter(game =>
                game.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtro por género
        if (selectedGenre) {
            filtered = filtered.filter(game =>
                game.genre.toLowerCase() === selectedGenre.toLowerCase()
            );
        }

        // Filtro por año
        if (selectedYear) {
            filtered = filtered.filter(game =>
                game.release_year.toString() === selectedYear
            );
        }

        // Ordenar
        if (sortBy === 'rating-high') {
            filtered.sort((a, b) => parseFloat(b.average_rating || 0) - parseFloat(a.average_rating || 0));
        } else if (sortBy === 'rating-low') {
            filtered.sort((a, b) => parseFloat(a.average_rating || 0) - parseFloat(b.average_rating || 0));
        } else if (sortBy === 'year-new') {
            filtered.sort((a, b) => b.release_year - a.release_year);
        } else if (sortBy === 'year-old') {
            filtered.sort((a, b) => a.release_year - b.release_year);
        } else if (sortBy === 'name-az') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'name-za') {
            filtered.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredGames(filtered);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedGenre('');
        setSelectedYear('');
        setSortBy('recent');
    };

    // Obtener géneros únicos
    const uniqueGenres = [...new Set(videogames.map(game => game.genre))];
    
    // Obtener años únicos
    const uniqueYears = [...new Set(videogames.map(game => game.release_year))].sort((a, b) => b - a);

    const handleDelete = async (id, title) => {
        if (window.confirm(`¿Estás seguro de eliminar "${title}"?`)) {
            try {
                await api.delete(`/videogames/${id}`);
                alert('Videojuego eliminado exitosamente');
                fetchVideogames();
            } catch (error) {
                console.error('Error al eliminar videojuego:', error);
                alert('Error al eliminar el videojuego');
            }
        }
    };

    if (loading) {
        return (
            <div style={{ 
                minHeight: '100vh', 
                backgroundColor: '#1a1a2e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '20px'
            }}>
                Cargando videojuegos...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                minHeight: '100vh', 
                backgroundColor: '#1a1a2e',
            }}>
                <Navbar />
                <div style={{
                    padding: '20px',
                    color: '#ef4444',
                    fontSize: '18px'
                }}>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#1a1a2e',
        }}>
            <Navbar />
            
            <div style={{ padding: '20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ color: '#4F46E5', marginBottom: '30px' }}>
                        🎮 Videojuegos
                    </h1>

                    {/* Panel de Filtros */}
                    <div style={{
                        backgroundColor: '#16213e',
                        padding: '25px',
                        borderRadius: '10px',
                        marginBottom: '30px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '15px',
                            marginBottom: '15px'
                        }}>
                            {/* Búsqueda */}
                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    color: '#a8a8a8', 
                                    marginBottom: '8px',
                                    fontSize: '14px'
                                }}>
                                    🔍 Buscar
                                </label>
                                <input
                                    type="text"
                                    placeholder="Buscar por título..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #0f3460',
                                        backgroundColor: '#0f3460',
                                        color: '#fff',
                                        fontSize: '14px'
                                    }}
                                />
                            </div>

                            {/* Filtro por Género */}
                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    color: '#a8a8a8', 
                                    marginBottom: '8px',
                                    fontSize: '14px'
                                }}>
                                    🎮 Género
                                </label>
                                <select
                                    value={selectedGenre}
                                    onChange={(e) => setSelectedGenre(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #0f3460',
                                        backgroundColor: '#0f3460',
                                        color: '#fff',
                                        fontSize: '14px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="">Todos los géneros</option>
                                    {uniqueGenres.map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filtro por Año */}
                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    color: '#a8a8a8', 
                                    marginBottom: '8px',
                                    fontSize: '14px'
                                }}>
                                    📅 Año
                                </label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #0f3460',
                                        backgroundColor: '#0f3460',
                                        color: '#fff',
                                        fontSize: '14px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="">Todos los años</option>
                                    {uniqueYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Ordenar */}
                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    color: '#a8a8a8', 
                                    marginBottom: '8px',
                                    fontSize: '14px'
                                }}>
                                    ⭐ Ordenar por
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #0f3460',
                                        backgroundColor: '#0f3460',
                                        color: '#fff',
                                        fontSize: '14px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="recent">Más recientes</option>
                                    <option value="year-new">Año (nuevo a viejo)</option>
                                    <option value="year-old">Año (viejo a nuevo)</option>
                                    <option value="rating-high">Calificación (alta a baja)</option>
                                    <option value="rating-low">Calificación (baja a alta)</option>
                                    <option value="name-az">Nombre (A-Z)</option>
                                    <option value="name-za">Nombre (Z-A)</option>
                                </select>
                            </div>
                        </div>

                        {/* Botón Limpiar Filtros y Contador */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: '15px',
                            borderTop: '1px solid #0f3460'
                        }}>
                            <span style={{ color: '#a8a8a8', fontSize: '14px' }}>
                                📊 Mostrando <strong style={{ color: '#4F46E5' }}>{filteredGames.length}</strong> de <strong>{videogames.length}</strong> juegos
                            </span>
                            <button
                                onClick={clearFilters}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#6b7280',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                }}
                            >
                                🗑️ Limpiar filtros
                            </button>
                        </div>
                    </div>

                    {/* Grid de Videojuegos */}
                    {filteredGames.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            backgroundColor: '#16213e',
                            borderRadius: '10px'
                        }}>
                            <h2 style={{ color: '#a8a8a8', fontSize: '24px' }}>
                                😔 No se encontraron videojuegos
                            </h2>
                            <p style={{ color: '#6b7280', marginTop: '10px' }}>
                                Intenta cambiar los filtros de búsqueda
                            </p>
                        </div>
                    ) : (
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                            gap: '20px' 
                        }}>
                            {filteredGames.map((game) => (
                                <div 
                                    key={game.id}
                                    style={{
                                        backgroundColor: '#16213e',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                                        transition: 'transform 0.2s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <img 
                                        src={game.cover_image} 
                                        alt={game.title}
                                        style={{
                                            width: '100%',
                                            height: '350px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div style={{ padding: '20px' }}>
                                        <h3 style={{ color: '#fff', marginBottom: '10px' }}>
                                            {game.title}
                                        </h3>
                                        <p style={{ 
                                            color: '#a8a8a8', 
                                            fontSize: '14px',
                                            marginBottom: '10px',
                                            minHeight: '60px'
                                        }}>
                                            {game.description?.substring(0, 100)}...
                                        </p>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            marginTop: '15px'
                                        }}>
                                            <span style={{ 
                                                color: '#4F46E5',
                                                fontSize: '14px',
                                                fontWeight: 'bold'
                                            }}>
                                                {game.genre}
                                            </span>
                                            <span style={{ color: '#a8a8a8', fontSize: '14px' }}>
                                                {game.release_year}
                                            </span>
                                        </div>
                                        <div style={{ 
                                            marginTop: '10px',
                                            paddingTop: '10px',
                                            borderTop: '1px solid #0f3460'
                                        }}>
                                            <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                                ⭐ {game.average_rating || 'Sin calificar'}
                                            </span>
                                            <span style={{ 
                                                color: '#a8a8a8', 
                                                fontSize: '12px',
                                                marginLeft: '10px'
                                            }}>
                                                {game.developer}
                                            </span>
                                        </div>

                                        {user?.is_admin && (
                                            <>
                                                <button
                                                    onClick={() => navigate(`/edit-videogame/${game.id}`)}
                                                    style={{
                                                        marginTop: '15px',
                                                        width: '100%',
                                                        padding: '10px',
                                                        backgroundColor: '#F59E0B',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold',
                                                        fontSize: '14px'
                                                    }}
                                                >
                                                    ✏️ Editar
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(game.id, game.title)}
                                                    style={{
                                                        marginTop: '10px',
                                                        width: '100%',
                                                        padding: '10px',
                                                        backgroundColor: '#ef4444',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold',
                                                        fontSize: '14px'
                                                    }}
                                                >
                                                    🗑️ Eliminar
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Videogames;