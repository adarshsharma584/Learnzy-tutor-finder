import React from 'react'
import { Navigate,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
    const location = useLocation();
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace state={{ from: location }} />;
    
    }
    return (
        <>{children}</>
    );
}

export default ProtectedRoute