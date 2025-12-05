import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';

function AddVideogame() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        developer: '',
        release_year: '',
        cover_image: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await api.post('/videogames', formData);
            console.log('Videojuego creado:', response.data);
            setSuccess('¡Videojuego agregado exitosamente!');
            
            // Limpiar formulario
            setFormData({
                title: '',
                description: '',
                genre: '',
                developer: '',
                release_year: '',
                cover_image: ''
            });

            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate('/videogames');
            }, 2000);
        } catch (error) {
            console.error('Error al crear videojuego:', error);
            setError(error.response?.data?.message || 'Error al agregar el videojuego');
        } finally {
            setLoading(false);
        }
    };

    // Solo administradores pueden agregar videojuegos
    if (!user?.is_admin) {
        return (
            <div style={{ 
                minHeight: '100vh', 
                backgroundColor: '#1a1a2e',
            }}>
                <Navbar />
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: '40px 20px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        backgroundColor: '#ef4444',
                        color: '#fff',
                        padding: '20px',
                        borderRadius: '10px'
                    }}>
                        ⚠️ Solo los administradores pueden agregar videojuegos
                    </div>
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
            
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '20px'
            }}>
                <h1 style={{ color: '#4F46E5', marginBottom: '30px' }}>
                    ➕ Agregar Nuevo Videojuego
                </h1>

                <div style={{
                    backgroundColor: '#16213e',
                    padding: '40px',
                    borderRadius: '10px'
                }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ 
                                display: 'block', 
                                color: '#fff', 
                                marginBottom: '8px',
                                fontWeight: 'bold'
                            }}>
                                Título *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
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
                                placeholder="Ej: The Legend of Zelda"
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ 
                                display: 'block', 
                                color: '#fff', 
                                marginBottom: '8px',
                                fontWeight: 'bold'
                            }}>
                                Descripción
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '5px',
                                    border: '1px solid #0f3460',
                                    backgroundColor: '#0f3460',
                                    color: '#fff',
                                    fontSize: '16px',
                                    resize: 'vertical'
                                }}
                                placeholder="Describe el videojuego..."
                            />
                        </div>

                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: '1fr 1fr', 
                            gap: '20px',
                            marginBottom: '20px'
                        }}>
                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    color: '#fff', 
                                    marginBottom: '8px',
                                    fontWeight: 'bold'
                                }}>
                                    Género *
                                </label>
                                <input
                                    type="text"
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleChange}
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
                                    placeholder="Ej: Aventura"
                                />
                            </div>

                            <div>
                                <label style={{ 
                                    display: 'block', 
                                    color: '#fff', 
                                    marginBottom: '8px',
                                    fontWeight: 'bold'
                                }}>
                                    Año de Lanzamiento *
                                </label>
                                <input
                                    type="number"
                                    name="release_year"
                                    value={formData.release_year}
                                    onChange={handleChange}
                                    required
                                    min="1950"
                                    max={new Date().getFullYear() + 5}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '5px',
                                        border: '1px solid #0f3460',
                                        backgroundColor: '#0f3460',
                                        color: '#fff',
                                        fontSize: '16px'
                                    }}
                                    placeholder="2024"
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ 
                                display: 'block', 
                                color: '#fff', 
                                marginBottom: '8px',
                                fontWeight: 'bold'
                            }}>
                                Desarrollador *
                            </label>
                            <input
                                type="text"
                                name="developer"
                                value={formData.developer}
                                onChange={handleChange}
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
                                placeholder="Ej: Nintendo"
                            />
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ 
                                display: 'block', 
                                color: '#fff', 
                                marginBottom: '8px',
                                fontWeight: 'bold'
                            }}>
                                URL de la Portada
                            </label>
                            <input
                                type="url"
                                name="cover_image"
                                value={formData.cover_image}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '5px',
                                    border: '1px solid #0f3460',
                                    backgroundColor: '#0f3460',
                                    color: '#fff',
                                    fontSize: '16px'
                                }}
                                placeholder="https://ejemplo.com/imagen.jpg"
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

                        {success && (
                            <div style={{
                                backgroundColor: '#10B981',
                                color: '#fff',
                                padding: '12px',
                                borderRadius: '5px',
                                marginBottom: '20px'
                            }}>
                                {success}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    flex: 1,
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
                                {loading ? 'Agregando...' : 'Agregar Videojuego'}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate('/videogames')}
                                style={{
                                    padding: '12px 24px',
                                    backgroundColor: '#6b7280',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    fontSize: '16px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddVideogame;