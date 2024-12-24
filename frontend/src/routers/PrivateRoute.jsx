import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {

    // manage check out page if user is available then so the check out page 
    const { currUser, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    if (currUser) {
        return children;
    }

    return <Navigate to="/login" replace />
}

export default PrivateRoute
