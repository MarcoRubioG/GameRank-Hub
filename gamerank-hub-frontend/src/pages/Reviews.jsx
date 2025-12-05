import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

function Reviews() {
    const [videogames, setVideogames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await api.get('/videogames');
            // Filtrar solo los juegos que tienen reseñas
            const gamesWithReviews = response.data.data.data.filter(
                game => game.reviews && game.reviews.length > 0
            );
            setVideogames(gamesWithReviews);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar reseñas:', error);
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
                Cargando reseñas...
            </div>
        );
    }

    return (
    <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#1a1a2e',
    }}>
        <Navbar />
        <div style={{ padding: '20px' }}></div>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ color: '#4F46E5', marginBottom: '30px' }}>
                    📝 Reseñas
                </h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {videogames.map((game) => (
                        game.reviews.map((review) => (
                            <div 
                                key={review.id}
                                style={{
                                    backgroundColor: '#16213e',
                                    borderRadius: '10px',
                                    padding: '20px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                                }}
                            >
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    marginBottom: '15px'
                                }}>
                                    <div>
                                        <h3 style={{ color: '#fff', marginBottom: '5px' }}>
                                            {review.title}
                                        </h3>
                                        <p style={{ color: '#a8a8a8', fontSize: '14px' }}>
                                            Juego: <span style={{ color: '#4F46E5' }}>{game.title}</span>
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ 
                                            color: '#10B981', 
                                            fontSize: '24px',
                                            fontWeight: 'bold'
                                        }}>
                                            ⭐ {review.rating}
                                        </div>
                                    </div>
                                </div>

                                <p style={{ color: '#fff', lineHeight: '1.6', marginBottom: '15px' }}>
                                    {review.content}
                                </p>

                                <div style={{ 
                                    display: 'flex', 
                                    gap: '20px',
                                    fontSize: '14px',
                                    color: '#a8a8a8'
                                }}>
                                    <span>👍 {review.upvotes} votos positivos</span>
                                    <span>👎 {review.downvotes} votos negativos</span>
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Reviews;