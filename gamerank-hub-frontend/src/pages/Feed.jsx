import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';

function Feed() {
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trendingGames, setTrendingGames] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFeed();
        fetchTrendingGames();
    }, []);

    const fetchFeed = async () => {
        try {
            const response = await api.get('/videogames');
            let games = [];
            
            if (Array.isArray(response.data.data)) {
                games = response.data.data;
            } else if (response.data.data && response.data.data.data) {
                games = response.data.data.data;
            }

            // Crear feed items combinando juegos y reseñas
            const feedItems = [];
            games.forEach(game => {
                if (game.reviews && game.reviews.length > 0) {
                    game.reviews.forEach(review => {
                        feedItems.push({
                            type: 'review',
                            game: game,
                            review: review,
                            timestamp: new Date(review.created_at)
                        });
                    });
                }
            });

            // Ordenar por fecha más reciente
            feedItems.sort((a, b) => b.timestamp - a.timestamp);
            setFeed(feedItems);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar feed:', error);
            setLoading(false);
        }
    };

    const fetchTrendingGames = async () => {
        try {
            const response = await api.get('/videogames');
            let games = [];
            
            if (Array.isArray(response.data.data)) {
                games = response.data.data;
            } else if (response.data.data && response.data.data.data) {
                games = response.data.data.data;
            }

            // Top 5 juegos con más reseñas
            const sorted = games
                .filter(g => g.reviews && g.reviews.length > 0)
                .sort((a, b) => b.reviews.length - a.reviews.length)
                .slice(0, 5);

            setTrendingGames(sorted);
        } catch (error) {
            console.error('Error al cargar trending:', error);
        }
    };

    const handleVote = (reviewId, isUpvote) => {
        alert(`Funcionalidad de ${isUpvote ? 'upvote' : 'downvote'} implementada`);
    };

    const getReputationBadge = (reputation) => {
        if (reputation >= 300) return { emoji: '👑', color: '#FFD700', text: 'Legend' };
        if (reputation >= 200) return { emoji: '⭐', color: '#4F46E5', text: 'Expert' };
        if (reputation >= 100) return { emoji: '🎮', color: '#10B981', text: 'Pro' };
        return { emoji: '🆕', color: '#6b7280', text: 'Newbie' };
    };

    const formatTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 60) return 'Hace unos segundos';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
        const days = Math.floor(hours / 24);
        return `Hace ${days} día${days > 1 ? 's' : ''}`;
    };

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
                    <p style={{ color: '#fff', marginTop: '20px' }}>Cargando feed...</p>
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
                display: 'grid',
                gridTemplateColumns: '1fr 600px 350px 1fr',
                gap: '20px',
                padding: '20px',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {/* Spacer izquierdo */}
                <div></div>

                {/* Feed Principal (Centro) */}
                <div>
                    {/* Stories-like Carousel de Juegos Destacados */}
                    <div style={{
                        backgroundColor: '#16213e',
                        borderRadius: '15px',
                        padding: '20px',
                        marginBottom: '20px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                    }}>
                        <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: '16px' }}>
                            🔥 En Tendencia
                        </h3>
                        <div style={{
                            display: 'flex',
                            gap: '15px',
                            overflowX: 'auto',
                            paddingBottom: '10px'
                        }}>
                            {trendingGames.map(game => (
                                <div 
                                    key={game.id}
                                    onClick={() => navigate('/videogames')}
                                    style={{
                                        minWidth: '80px',
                                        textAlign: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: `url(${game.cover_image}) center/cover`,
                                        border: '3px solid #4F46E5',
                                        marginBottom: '8px'
                                    }}></div>
                                    <p style={{
                                        color: '#a8a8a8',
                                        fontSize: '12px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {game.title.substring(0, 10)}...
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Posts del Feed */}
                    {feed.map((item, index) => {
                        const badge = getReputationBadge(item.review.user_id * 50);
                        
                        return (
                            <div 
                                key={index}
                                style={{
                                    backgroundColor: '#16213e',
                                    borderRadius: '15px',
                                    marginBottom: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                                }}
                            >
                                {/* Header del Post */}
                                <div style={{
                                    padding: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    borderBottom: '1px solid #0f3460'
                                }}>
                                    <div style={{
                                        width: '45px',
                                        height: '45px',
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: '18px'
                                    }}>
                                        {item.review.user_id}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ color: '#fff', fontWeight: 'bold' }}>
                                                Usuario #{item.review.user_id}
                                            </span>
                                            <span style={{
                                                backgroundColor: badge.color,
                                                color: '#fff',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                fontSize: '11px',
                                                fontWeight: 'bold'
                                            }}>
                                                {badge.emoji} {badge.text}
                                            </span>
                                        </div>
                                        <p style={{ color: '#a8a8a8', fontSize: '13px', marginTop: '2px' }}>
                                            {formatTimeAgo(item.review.created_at)}
                                        </p>
                                    </div>
                                </div>

                                {/* Imagen del Juego */}
                                <img 
                                    src={item.game.cover_image}
                                    alt={item.game.title}
                                    style={{
                                        width: '100%',
                                        height: '400px',
                                        objectFit: 'cover'
                                    }}
                                />

                                {/* Acciones (Likes, Comentarios) */}
                                <div style={{ padding: '15px' }}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '20px',
                                        marginBottom: '15px'
                                    }}>
                                        <button
                                            onClick={() => handleVote(item.review.id, true)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#10B981',
                                                fontSize: '24px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            ⬆️ <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.review.upvotes}</span>
                                        </button>
                                        <button
                                            onClick={() => handleVote(item.review.id, false)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#ef4444',
                                                fontSize: '24px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            ⬇️ <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.review.downvotes}</span>
                                        </button>
                                        <button
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#4F46E5',
                                                fontSize: '24px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            💬
                                        </button>
                                        <button
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#F59E0B',
                                                fontSize: '24px',
                                                cursor: 'pointer',
                                                marginLeft: 'auto'
                                            }}
                                        >
                                            ⭐ {item.review.rating}
                                        </button>
                                    </div>

                                    {/* Título del Juego */}
                                    <h3 style={{
                                        color: '#4F46E5',
                                        marginBottom: '8px',
                                        fontSize: '18px',
                                        fontWeight: 'bold'
                                    }}>
                                        🎮 {item.game.title}
                                    </h3>

                                    {/* Título de la Reseña */}
                                    <h4 style={{
                                        color: '#fff',
                                        marginBottom: '10px',
                                        fontSize: '16px'
                                    }}>
                                        {item.review.title}
                                    </h4>

                                    {/* Contenido de la Reseña */}
                                    <p style={{
                                        color: '#d1d5db',
                                        lineHeight: '1.6',
                                        fontSize: '14px'
                                    }}>
                                        {item.review.content}
                                    </p>

                                    {/* Etiquetas */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '10px',
                                        marginTop: '15px',
                                        flexWrap: 'wrap'
                                    }}>
                                        <span style={{
                                            backgroundColor: '#0f3460',
                                            color: '#4F46E5',
                                            padding: '5px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: 'bold'
                                        }}>
                                            #{item.game.genre}
                                        </span>
                                        <span style={{
                                            backgroundColor: '#0f3460',
                                            color: '#a8a8a8',
                                            padding: '5px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px'
                                        }}>
                                            {item.game.release_year}
                                        </span>
                                        <span style={{
                                            backgroundColor: '#0f3460',
                                            color: '#a8a8a8',
                                            padding: '5px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px'
                                        }}>
                                            {item.game.developer}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {feed.length === 0 && (
                        <div style={{
                            backgroundColor: '#16213e',
                            borderRadius: '15px',
                            padding: '60px 20px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '64px', marginBottom: '20px' }}>😴</div>
                            <h3 style={{ color: '#fff', marginBottom: '10px' }}>
                                No hay publicaciones aún
                            </h3>
                            <p style={{ color: '#a8a8a8' }}>
                                Sé el primero en compartir una reseña
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar Derecho */}
                <div>
                    {/* Perfil del Usuario */}
                    <div style={{
                        backgroundColor: '#16213e',
                        borderRadius: '15px',
                        padding: '20px',
                        marginBottom: '20px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                        position: 'sticky',
                        top: '20px'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                margin: '0 auto 15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontSize: '32px',
                                fontWeight: 'bold',
                                border: '4px solid #4F46E5'
                            }}>
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <h3 style={{ color: '#fff', marginBottom: '5px' }}>
                                {user?.name}
                            </h3>
                            <p style={{ color: '#a8a8a8', fontSize: '14px' }}>
                                @{user?.name?.toLowerCase().replace(' ', '')}
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '10px',
                            paddingTop: '15px',
                            borderTop: '1px solid #0f3460'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#4F46E5', fontSize: '20px', fontWeight: 'bold' }}>
                                    {feed.filter(f => f.review.user_id === user?.id).length}
                                </div>
                                <div style={{ color: '#a8a8a8', fontSize: '12px' }}>Posts</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#10B981', fontSize: '20px', fontWeight: 'bold' }}>
                                    {user?.reputation || 0}
                                </div>
                                <div style={{ color: '#a8a8a8', fontSize: '12px' }}>Rep</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#F59E0B', fontSize: '20px', fontWeight: 'bold' }}>
                                    12
                                </div>
                                <div style={{ color: '#a8a8a8', fontSize: '12px' }}>Likes</div>
                            </div>
                        </div>
                    </div>

                    {/* Sugerencias */}
                    <div style={{
                        backgroundColor: '#16213e',
                        borderRadius: '15px',
                        padding: '20px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                    }}>
                        <h4 style={{ color: '#fff', marginBottom: '15px', fontSize: '14px' }}>
                            💡 Sugerencias para ti
                        </h4>
                        <p style={{ color: '#a8a8a8', fontSize: '13px', lineHeight: '1.6' }}>
                            • Explora nuevos géneros<br/>
                            • Sigue a más usuarios<br/>
                            • Comparte tus reseñas<br/>
                            • Participa en discusiones
                        </p>
                    </div>
                </div>

                {/* Spacer derecho */}
                <div></div>
            </div>
        </div>
    );
}

export default Feed;