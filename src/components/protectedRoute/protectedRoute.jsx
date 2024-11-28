import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === "true";

    return isAuthenticated ? element : <Navigate to="/autenticacion" replace />;
}

export default ProtectedRoute;
