import { useState, useEffect } from 'react';
import api from '../services/api';

function Videogames() {
    const [videogames, setVideogames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchVideogames();
    }, []);

    const fetchVideogames = async () => {
        try {
            const response = await api.get('/videogames');
            setVideogames(response.data.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar videojuegos:', error);
            setError('Error al cargar los videojuegos');
            setLoading(false);
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
                padding: '20px',
                color: '#ef4444',
                fontSize: '18px'
            }}>
                {error}
            </div>
        );
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#1a1a2e',
            padding: '20px'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ color: '#4F46E5', marginBottom: '30px' }}>
                    🎮 Videojuegos
                </h1>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                    gap: '20px' 
                }}>
                    {videogames.map((game) => (
                        <div 
                            key={game.id}
                            style={{
                                backgroundColor: '#16213e',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                            }}
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
                                    marginBottom: '10px' 
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
                                <div style={{ marginTop: '10px' }}>
                                    <span style={{ color: '#10B981', fontWeight: 'bold' }}>
                                        ⭐ {game.average_rating || 'Sin calificar'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Videogames;