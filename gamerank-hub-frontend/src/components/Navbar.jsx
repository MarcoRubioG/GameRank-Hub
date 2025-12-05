import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav style={{
            backgroundColor: '#16213e',
            padding: '15px 0',
            marginBottom: '0',
            borderBottom: '1px solid #0f3460',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Logo */}
                <Link to="/" style={{ 
                    color: '#4F46E5', 
                    textDecoration: 'none',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    🎮 <span style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>GameRank</span>
                </Link>
                
                {/* Links de Navegación */}
                <div style={{ 
                    display: 'flex', 
                    gap: '30px', 
                    alignItems: 'center' 
                }}>
                    <Link 
                        to="/" 
                        style={{ 
                            color: isActive('/') ? '#4F46E5' : '#fff',
                            textDecoration: 'none',
                            fontWeight: isActive('/') ? 'bold' : 'normal',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '16px',
                            transition: 'color 0.2s',
                            borderBottom: isActive('/') ? '2px solid #4F46E5' : 'none',
                            paddingBottom: '5px'
                        }}
                    >
                        🏠 Feed
                    </Link>
                    
                    <Link 
                        to="/videogames" 
                        style={{ 
                            color: isActive('/videogames') ? '#4F46E5' : '#fff',
                            textDecoration: 'none',
                            fontWeight: isActive('/videogames') ? 'bold' : 'normal',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '16px',
                            transition: 'color 0.2s',
                            borderBottom: isActive('/videogames') ? '2px solid #4F46E5' : 'none',
                            paddingBottom: '5px'
                        }}
                    >
                        🎮 Explorar
                    </Link>
                    
                    <Link 
                        to="/reviews" 
                        style={{ 
                            color: isActive('/reviews') ? '#4F46E5' : '#fff',
                            textDecoration: 'none',
                            fontWeight: isActive('/reviews') ? 'bold' : 'normal',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '16px',
                            transition: 'color 0.2s',
                            borderBottom: isActive('/reviews') ? '2px solid #4F46E5' : 'none',
                            paddingBottom: '5px'
                        }}
                    >
                        📝 Reseñas
                    </Link>
                    <Link 
    to="/explore" 
    style={{ 
        color: isActive('/explore') ? '#4F46E5' : '#fff',
        textDecoration: 'none',
        fontWeight: isActive('/explore') ? 'bold' : 'normal',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '16px',
        transition: 'color 0.2s',
        borderBottom: isActive('/explore') ? '2px solid #4F46E5' : 'none',
        paddingBottom: '5px'
    }}
>
    🌍 Descubrir
</Link>
                    {user?.is_admin && (
                        <>
                            <Link 
                                to="/users" 
                                style={{ 
                                    color: isActive('/users') ? '#10B981' : '#10B981',
                                    textDecoration: 'none',
                                    fontWeight: isActive('/users') ? 'bold' : 'normal',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '16px',
                                    borderBottom: isActive('/users') ? '2px solid #10B981' : 'none',
                                    paddingBottom: '5px'
                                }}
                            >
                                👥 Usuarios
                            </Link>

                            <Link 
                                to="/add-videogame" 
                                style={{ 
                                    color: '#fff',
                                    backgroundColor: '#10B981',
                                    textDecoration: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '14px',
                                    transition: 'transform 0.2s',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                ➕ Agregar Juego
                            </Link>
                        </>
                    )}
                </div>
                
                {/* Usuario y Logout */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '15px' 
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 15px',
                        backgroundColor: '#0f3460',
                        borderRadius: '25px'
                    }}>
                        <div style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '16px'
                        }}>
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ 
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            {user?.name}
                        </span>
                    </div>
                    
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#ef4444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#dc2626';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ef4444';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        🚪 Salir
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;