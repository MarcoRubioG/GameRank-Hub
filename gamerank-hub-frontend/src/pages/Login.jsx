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

    console.log('Intentando login con:', email);
    const result = await login(email, password);
    console.log('Resultado del login:', result);
    
    if (result.success) {
        console.log('Login exitoso, redirigiendo...');
        navigate('/');
    } else {
        console.log('Login fallido:', result.message);
        setError(result.message);
    }
    
    setLoading(false);
};

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#1a1a2e'
        }}>
            <div style={{
                backgroundColor: '#16213e',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h1 style={{ 
                    color: '#4F46E5', 
                    textAlign: 'center', 
                    marginBottom: '30px' 
                }}>
                    🎮 GameRank Hub
                </h1>
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ 
                            display: 'block', 
                            color: '#fff', 
                            marginBottom: '8px' 
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '5px',
                                border: '1px solid #0f3460',
                                backgroundColor: '#0f3460',
                                color: '#fff',
                                fontSize: '16px'
                            }}
                            placeholder="admin@gamerank.com"
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ 
                            display: 'block', 
                            color: '#fff', 
                            marginBottom: '8px' 
                        }}>
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '5px',
                                border: '1px solid #0f3460',
                                backgroundColor: '#0f3460',
                                color: '#fff',
                                fontSize: '16px'
                            }}
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div style={{
                            backgroundColor: '#ef4444',
                            color: '#fff',
                            padding: '12px',
                            borderRadius: '5px',
                            marginBottom: '20px'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#4F46E5',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.6 : 1
                        }}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;