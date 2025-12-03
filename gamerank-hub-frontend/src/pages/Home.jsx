import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

function Home() {
    const { user } = useContext(AuthContext);

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#1a1a2e',
        }}>
            <Navbar />
            
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px'
            }}>
                <div style={{
                    backgroundColor: '#16213e',
                    padding: '40px',
                    borderRadius: '10px',
                    textAlign: 'center'
                }}>
                    <h2 style={{ color: '#fff', marginBottom: '20px', fontSize: '32px' }}>
                        ¡Bienvenido a GameRank Hub, {user?.name}!
                    </h2>
                    <p style={{ color: '#a8a8a8', fontSize: '18px', marginBottom: '30px' }}>
                        Tu plataforma para calificar y descubrir videojuegos
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        marginTop: '40px'
                    }}>
                        <div style={{
                            backgroundColor: '#0f3460',
                            padding: '30px',
                            borderRadius: '10px'
                        }}>
                            <h3 style={{ color: '#4F46E5', fontSize: '48px', marginBottom: '10px' }}>
                                10
                            </h3>
                            <p style={{ color: '#fff', fontSize: '18px' }}>
                                Videojuegos disponibles
                            </p>
                        </div>

                        <div style={{
                            backgroundColor: '#0f3460',
                            padding: '30px',
                            borderRadius: '10px'
                        }}>
                            <h3 style={{ color: '#10B981', fontSize: '48px', marginBottom: '10px' }}>
                                8
                            </h3>
                            <p style={{ color: '#fff', fontSize: '18px' }}>
                                Reseñas publicadas
                            </p>
                        </div>

                        <div style={{
                            backgroundColor: '#0f3460',
                            padding: '30px',
                            borderRadius: '10px'
                        }}>
                            <h3 style={{ color: '#F59E0B', fontSize: '48px', marginBottom: '10px' }}>
                                5
                            </h3>
                            <p style={{ color: '#fff', fontSize: '18px' }}>
                                Usuarios activos
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;