import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const loadUser = async () => {
        try {
            const response = await api.get('/auth/me');
            setUser(response.data.user);
        } catch (error) {
            console.error('Error al cargar usuario:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            console.log('Respuesta del login:', response.data);
            
            // Extraer el token de la respuesta
            const tokenFromResponse = response.data.authorization?.token || response.data.token;
            const userFromResponse = response.data.user;
            
            if (!tokenFromResponse) {
                console.error('No se recibió token en la respuesta');
                return { 
                    success: false, 
                    message: 'Error: No se recibió token de autenticación' 
                };
            }
            
            // Guardar primero en localStorage
            localStorage.setItem('token', tokenFromResponse);
            
            // Luego actualizar el estado
            setToken(tokenFromResponse);
            setUser(userFromResponse);
            
            return { success: true };
        } catch (error) {
            console.error('Error completo:', error.response?.data);
            return { 
                success: false, 
                message: error.response?.data?.message || 'Error al iniciar sesión' 
            };
        }
    };

    const register = async (name, email, password, password_confirmation) => {
        try {
            const response = await api.post('/auth/register', { 
                name, 
                email, 
                password, 
                password_confirmation 
            });
            
            const tokenFromResponse = response.data.authorization?.token || response.data.token;
            const userFromResponse = response.data.user;
            
            localStorage.setItem('token', tokenFromResponse);
            setToken(tokenFromResponse);
            setUser(userFromResponse);
            
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Error al registrarse' 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            token, 
            login, 
            register, 
            logout, 
            loading,
            isAuthenticated: !!token && !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};