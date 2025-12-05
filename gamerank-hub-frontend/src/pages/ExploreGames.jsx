import { useState, useEffect } from 'react';
import { getPopularGames, searchGames, getGenres, getGamesByGenre } from '../services/rawgApi';
import Navbar from '../components/Navbar';

function ExploreGames() {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [sortBy, setSortBy] = useState('rating');

    useEffect(() => {
        fetchGames();
        fetchGenres();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [games, searchTerm, selectedGenre, selectedYear, sortBy]);

    const fetchGames = async () => {
        try {
            setLoading(true);
            const data = await getPopularGames(1, 60); // Aumentar a 60 juegos
            setGames(data.results);
            setFilteredGames(data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    const fetchGenres = async () => {
        try {
            const data = await getGenres();
            setGenres(data.results);
        } catch (error) {
            console.error('Error al cargar géneros:', error);
        }
    };

    const applyFilters = () => {
        let filtered = [...games];

        // Filtro de búsqueda por título
        if (searchTerm.trim()) {
            filtered = filtered.filter(game =>
                game.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filtro por género
        if (selectedGenre) {
            filtered = filtered.filter(game =>
                game.genres && game.genres.some(g => g.id.toString() === selectedGenre)
            );
        }

        // Filtro por año
        if (selectedYear) {
            filtered = filtered.filter(game => {
                const gameYear = game.released ? new Date(game.released).getFullYear() : null;
                return gameYear && gameYear.toString() === selectedYear;
            });
        }

        // Ordenar
        if (sortBy === 'rating-high') {
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortBy === 'rating-low') {
            filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        } else if (sortBy === 'name-az') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'name-za') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortBy === 'year-new') {
            filtered.sort((a, b) => {
                const yearA = a.released ? new Date(a.released).getFullYear() : 0;
                const yearB = b.released ? new Date(b.released).getFullYear() : 0;
                return yearB - yearA;
            });
        } else if (sortBy === 'year-old') {
            filtered.sort((a, b) => {
                const yearA = a.released ? new Date(a.released).getFullYear() : 0;
                const yearB = b.released ? new Date(b.released).getFullYear() : 0;
                return yearA - yearB;
            });
        } else if (sortBy === 'popularity') {
            filtered.sort((a, b) => (b.ratings_count || 0) - (a.ratings_count || 0));
        }

        setFilteredGames(filtered);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedGenre('');
        setSelectedYear('');
        setSortBy('rating');
    };

    // Obtener años únicos de los juegos
    const uniqueYears = [...new Set(
        games
            .filter(g => g.released)
            .map(g => new Date(g.released).getFullYear())
    )].sort((a, b) => b - a);

    if (loading) {
        return (
            <div style={{ 
                minHeight: '100vh', 
                backgroundColor: '#0a0a0a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                        fontSize: '48px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                    }}>
                        🎮
                    </div>
                    <p style={{ color: '#fff', marginTop: '20px', fontSize: '18px' }}>
                        Cargando juegos desde RAWG...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#0a0a0a',
        }}>
            <Navbar />
            
            <div style={{ 
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '20px'
            }}>
                <div style={{
                    marginBottom: '30px'
                }}>
                    <h1 style={{ 
                        color: '#fff', 
                        marginBottom: '10px',
                        fontSize: '42px',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        🌍 Explorar Juegos Globales
                    </h1>
                    <p style={{ 
                        color: '#a8a8a8', 
                        fontSize: '16px' 
                    }}>
                        Descubre miles de videojuegos de todo el mundo
                    </p>
                </div>

                {/* Panel de Filtros */}
                <div style={{
                    backgroundColor: '#16213e',
                    padding: '25px',
                    borderRadius: '15px',
                    marginBottom: '30px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '15px',
                        marginBottom: '15px'
                    }}>
                        {/* Búsqueda */}
                        <div>
                            <label style={{ 
                                display: 'block', 
                                color: '#a8a8a8', 
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '600'
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
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '2px solid #0f3460',
                                    backgroundColor: '#0f3460',
                                    color: '#fff',
                                    fontSize: '14px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                                onBlur={(e) => e.target.style.borderColor = '#0f3460'}
                            />
                        </div>

                        {/* Filtro por Género */}
                        <div>
                            <label style={{ 
                                display: 'block', 
                                color: '#a8a8a8', 
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '600'
                            }}>
                                🎮 Género
                            </label>
                            <select
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '2px solid #0f3460',
                                    backgroundColor: '#0f3460',
                                    color: '#fff',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                <option value="">Todos los géneros</option>
                                {genres.map(genre => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name} ({genre.games_count})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtro por Año */}
                        <div>
                            <label style={{ 
                                display: 'block', 
                                color: '#a8a8a8', 
                                marginBottom: '8px',
                                fontSize: '14px',
                                fontWeight: '600'
                            }}>
                                📅 Año
                            </label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '2px solid #0f3460',
                                    backgroundColor: '#0f3460',
                                    color: '#fff',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    outline: 'none'
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
                                fontSize: '14px',
                                fontWeight: '600'
                            }}>
                                ⭐ Ordenar por
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '2px solid #0f3460',
                                    backgroundColor: '#0f3460',
                                    color: '#fff',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                <option value="rating">⭐ Mejor calificados</option>
                                <option value="rating-high">Calificación (alta a baja)</option>
                                <option value="rating-low">Calificación (baja a alta)</option>
                                <option value="popularity">🔥 Más populares</option>
                                <option value="year-new">Año (nuevo a viejo)</option>
                                <option value="year-old">Año (viejo a nuevo)</option>
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
                            📊 Mostrando <strong style={{ color: '#4F46E5' }}>{filteredGames.length}</strong> de <strong>{games.length}</strong> juegos
                        </span>
                        <button
                            onClick={clearFilters}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#6b7280',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#4b5563';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#6b7280';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            🗑️ Limpiar filtros
                        </button>
                    </div>
                </div>

                {/* Grid de juegos */}
                {filteredGames.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        backgroundColor: '#16213e',
                        borderRadius: '15px'
                    }}>
                        <div style={{ fontSize: '64px', marginBottom: '20px' }}>😔</div>
                        <h3 style={{ color: '#fff', marginBottom: '10px', fontSize: '24px' }}>
                            No se encontraron juegos
                        </h3>
                        <p style={{ color: '#a8a8a8', marginBottom: '20px' }}>
                            Intenta cambiar los filtros de búsqueda
                        </p>
                        <button
                            onClick={clearFilters}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#4F46E5',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Restablecer filtros
                        </button>
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
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(79, 70, 229, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    background: game.background_image 
                                        ? `url(${game.background_image}) center/cover`
                                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        backgroundColor: game.rating >= 4.5 ? '#10B981' : game.rating >= 4 ? '#F59E0B' : '#6b7280',
                                        color: '#fff',
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                    }}>
                                        ⭐ {game.rating ? game.rating.toFixed(1) : 'N/A'}
                                    </div>
                                </div>
                                
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ 
                                        color: '#fff', 
                                        marginBottom: '12px',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        minHeight: '48px',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {game.name}
                                    </h3>

                                    <div style={{
                                        display: 'flex',
                                        gap: '6px',
                                        flexWrap: 'wrap',
                                        marginBottom: '15px',
                                        minHeight: '28px'
                                    }}>
                                        {game.genres?.slice(0, 2).map((genre) => (
                                            <span 
                                                key={genre.id}
                                                style={{
                                                    backgroundColor: '#0f3460',
                                                    color: '#4F46E5',
                                                    padding: '4px 10px',
                                                    borderRadius: '15px',
                                                    fontSize: '11px',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingTop: '15px',
                                        borderTop: '1px solid #0f3460',
                                        marginBottom: '15px'
                                    }}>
                                        <span style={{ 
                                            color: '#a8a8a8', 
                                            fontSize: '13px' 
                                        }}>
                                            📅 {game.released || 'TBA'}
                                        </span>
                                        <span style={{ 
                                            color: '#F59E0B', 
                                            fontSize: '13px',
                                            fontWeight: 'bold'
                                        }}>
                                            ❤️ {(game.ratings_count || 0).toLocaleString()}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => window.open(`https://rawg.io/games/${game.slug}`, '_blank')}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            transition: 'transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        Ver en RAWG →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExploreGames;