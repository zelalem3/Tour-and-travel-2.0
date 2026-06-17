import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  
  const isAdmin = localStorage.getItem('is_admin') === 'true';

  if (!isAdmin) {
  
    return <Navigate to="/" replace />;
  }

  return children;
};