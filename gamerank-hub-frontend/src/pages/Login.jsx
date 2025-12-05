import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);
        
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        
        setLoading(false);
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decoración de fondo */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                animation: 'moveBackground 20s linear infinite'
            }}></div>

            {/* Lado izquierdo - Presentación */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '60px',
                color: '#fff',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ maxWidth: '500px' }}>
                    <h1 style={{ 
                        fontSize: '64px',
                        marginBottom: '20px',
                        fontWeight: 'bold',
                        textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                    }}>
                        🎮 GameRank Hub
                    </h1>
                    <p style={{ 
                        fontSize: '24px',
                        lineHeight: '1.6',
                        opacity: 0.9,
                        textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}>
                        La red social definitiva para gamers. Comparte, descubre y califica tus videojuegos favoritos.
                    </p>
                    <div style={{ marginTop: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <span style={{ fontSize: '32px' }}>✨</span>
                            <span style={{ fontSize: '18px' }}>Reseñas de la comunidad</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <span style={{ fontSize: '32px' }}>🏆</span>
                            <span style={{ fontSize: '18px' }}>Sistema de reputación</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ fontSize: '32px' }}>🔥</span>
                            <span style={{ fontSize: '18px' }}>Descubre lo mejor del gaming</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lado derecho - Formulario */}
            <div style={{
                width: '500px',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                zIndex: 2
            }}>
                <div style={{ width: '100%', maxWidth: '380px', padding: '40px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ 
                            fontSize: '32px',
                            marginBottom: '10px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold'
                        }}>
                            ¡Bienvenido de vuelta!
                        </h2>
                        <p style={{ color: '#6b7280', fontSize: '16px' }}>
                            Inicia sesión para continuar
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ 
                                display: 'block', 
                                color: '#374151', 
                                marginBottom: '8px',
                                fontWeight: '600',
                                fontSize: '14px'
                            }}>
                                📧 Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '10px',
                                    border: '2px solid #e5e7eb',
                                    fontSize: '16px',
                                    transition: 'border-color 0.2s',
                                    outline: 'none'
                                }}
                                placeholder="tu@email.com"
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ 
                                display: 'block', 
                                color: '#374151', 
                                marginBottom: '8px',
                                fontWeight: '600',
                                fontSize: '14px'
                            }}>
                                🔒 Contraseña
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '10px',
                                    border: '2px solid #e5e7eb',
                                    fontSize: '16px',
                                    transition: 'border-color 0.2s',
                                    outline: 'none'
                                }}
                                placeholder="••••••••"
                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </div>

                        {error && (
                            <div style={{
                                backgroundColor: '#fee2e2',
                                color: '#dc2626',
                                padding: '12px',
                                borderRadius: '10px',
                                marginBottom: '20px',
                                fontSize: '14px',
                                border: '1px solid #fecaca'
                            }}>
                                ⚠️ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1,
                                transition: 'transform 0.2s',
                                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                            }}
                            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {loading ? '🔄 Iniciando...' : '🚀 Iniciar Sesión'}
                        </button>

                        <div style={{
                            marginTop: '30px',
                            padding: '20px',
                            backgroundColor: '#f9fafb',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}>
                            <p style={{ 
                                color: '#6b7280', 
                                fontSize: '13px',
                                marginBottom: '10px',
                                fontWeight: '600'
                            }}>
                                🔐 Credenciales de prueba:
                            </p>
                            <p style={{ color: '#374151', fontSize: '12px', margin: '5px 0' }}>
                                📧 admin@gamerank.com
                            </p>
                            <p style={{ color: '#374151', fontSize: '12px' }}>
                                🔑 password123
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;