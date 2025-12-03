import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Videogames from './pages/Videogames';
import Reviews from './pages/Reviews';

// Componente para proteger rutas
function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useContext(AuthContext);
    
    if (loading) {
        return (
            <div style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#1a1a2e',
                color: '#fff',
                fontSize: '20px'
            }}>
                Cargando...
            </div>
        );
    }
    
    return isAuthenticated ? children : <Navigate to="/login" />;
}

// Componente para rutas públicas
function PublicRoute({ children }) {
    const { isAuthenticated, loading } = useContext(AuthContext);
    
    if (loading) {
        return (
            <div style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#1a1a2e',
                color: '#fff',
                fontSize: '20px'
            }}>
                Cargando...
            </div>
        );
    }
    
    return !isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route 
                        path="/login" 
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        } 
                    />
                    <Route 
                        path="/" 
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/videogames" 
                        element={
                            <PrivateRoute>
                                <Videogames />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/reviews" 
                        element={
                            <PrivateRoute>
                                <Reviews />
                            </PrivateRoute>
                        } 
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;