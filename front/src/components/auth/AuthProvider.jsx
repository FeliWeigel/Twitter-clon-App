/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const token = sessionStorage.getItem('acc_token');
    if (token) {
        setIsAuthenticated(true);
        setAuthToken(token);
    }else {
      setIsAuthenticated(false)
    }

    setLoading(false)
  }, []);

  const login = (token) => {
    setAuthToken(token)
    sessionStorage.setItem('acc_token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setAuthToken(null);
    sessionStorage.removeItem('acc_token');
    sessionStorage.removeItem('isAuth', true);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );

  
};


export const useAuth = () => useContext(AuthContext);