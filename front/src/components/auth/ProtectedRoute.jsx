/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Box } from '@mui/material';
import Loading from '../../utils/Loading';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { loading } = useAuth();

  console.log(isAuthenticated)
  
  if (loading) {
    return (
      <Box className="loading-container">
          <Loading size={'2.5rem'}/>
      </Box>
    )
  }
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;