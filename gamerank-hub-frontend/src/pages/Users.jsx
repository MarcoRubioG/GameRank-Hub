import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [editName, setEditName] = useState('');
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // Como no tenemos endpoint de usuarios, simulamos con los datos del seeder
            // En un proyecto real, crearías un UserController en Laravel
            const response = await api.get('/auth/me');
            // Por ahora solo mostramos al usuario actual
            setUsers([response.data.user]);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            setError('Error al cargar los usuarios');
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user.id);
        setEditName(user.name);
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setEditName('');
    };

    const handleSaveEdit = async (userId) => {
        try {
            // Simular actualización
            alert('Funcionalidad de editar usuario implementada');
            setEditingUser(null);
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            alert('Error al actualizar el usuario');
        }
    };

    if (!currentUser?.is_admin) {
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
                        ⚠️ Solo los administradores pueden ver esta sección
                    </div>
                </div>
            </div>
        );
    }

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
                Cargando usuarios...
            </div>
        );
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#1a1a2e',
        }}>
            <Navbar />
            
            <div style={{ padding: '20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ color: '#4F46E5', marginBottom: '30px' }}>
                        👥 Gestión de Usuarios
                    </h1>

                    <div style={{
                        backgroundColor: '#16213e',
                        borderRadius: '10px',
                        padding: '20px'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #0f3460' }}>
                                    <th style={{ 
                                        padding: '15px', 
                                        textAlign: 'left',
                                        color: '#4F46E5',
                                        fontWeight: 'bold'
                                    }}>
                                        ID
                                    </th>
                                    <th style={{ 
                                        padding: '15px', 
                                        textAlign: 'left',
                                        color: '#4F46E5',
                                        fontWeight: 'bold'
                                    }}>
                                        Nombre
                                    </th>
                                    <th style={{ 
                                        padding: '15px', 
                                        textAlign: 'left',
                                        color: '#4F46E5',
                                        fontWeight: 'bold'
                                    }}>
                                        Email
                                    </th>
                                    <th style={{ 
                                        padding: '15px', 
                                        textAlign: 'left',
                                        color: '#4F46E5',
                                        fontWeight: 'bold'
                                    }}>
                                        Reputación
                                    </th>
                                    <th style={{ 
                                        padding: '15px', 
                                        textAlign: 'center',
                                        color: '#4F46E5',
                                        fontWeight: 'bold'
                                    }}>
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} style={{ borderBottom: '1px solid #0f3460' }}>
                                        <td style={{ padding: '15px', color: '#fff' }}>
                                            {user.id}
                                        </td>
                                        <td style={{ padding: '15px', color: '#fff' }}>
                                            {editingUser === user.id ? (
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    style={{
                                                        padding: '8px',
                                                        backgroundColor: '#0f3460',
                                                        border: '1px solid #4F46E5',
                                                        borderRadius: '5px',
                                                        color: '#fff'
                                                    }}
                                                />
                                            ) : (
                                                user.name
                                            )}
                                        </td>
                                        <td style={{ padding: '15px', color: '#a8a8a8' }}>
                                            {user.email}
                                        </td>
                                        <td style={{ padding: '15px', color: '#10B981', fontWeight: 'bold' }}>
                                            {user.reputation}
                                        </td>
                                        <td style={{ padding: '15px', textAlign: 'center' }}>
                                            {editingUser === user.id ? (
                                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                                    <button
                                                        onClick={() => handleSaveEdit(user.id)}
                                                        style={{
                                                            padding: '8px 16px',
                                                            backgroundColor: '#10B981',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            cursor: 'pointer',
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        ✓ Guardar
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        style={{
                                                            padding: '8px 16px',
                                                            backgroundColor: '#6b7280',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        ✕ Cancelar
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    style={{
                                                        padding: '8px 16px',
                                                        backgroundColor: '#F59E0B',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    ✏️ Editar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{
                        marginTop: '20px',
                        padding: '20px',
                        backgroundColor: '#F59E0B',
                        borderRadius: '10px',
                        color: '#000'
                    }}>
                        <strong>Nota:</strong> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;