import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';

function App() {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route 
        path="/" 
        element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
      <Route 
        path="*" 
        element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} 
      />
    </Routes>
  )
}
export default App
