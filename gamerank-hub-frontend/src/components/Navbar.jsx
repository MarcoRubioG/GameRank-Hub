import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            backgroundColor: '#16213e',
            padding: '20px',
            marginBottom: '30px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <Link to="/" style={{ 
                        color: '#4F46E5', 
                        textDecoration: 'none',
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>
                        🎮 GameRank Hub
                    </Link>
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
                        Inicio
                    </Link>
                    <Link to="/videogames" style={{ color: '#fff', textDecoration: 'none' }}>
                        Videojuegos
                    </Link>
                    <Link to="/reviews" style={{ color: '#fff', textDecoration: 'none' }}>
                        Reseñas
                    </Link>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ color: '#fff' }}>
                        {user?.name}
                    </span>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#ef4444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;