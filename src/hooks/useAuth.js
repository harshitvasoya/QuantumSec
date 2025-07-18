import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const login = async (username, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        navigate('/admin/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login error');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  return { login, logout, isAuthenticated };
};

export default useAuth;
