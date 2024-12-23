import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {

    // manage check out page if user is available then so the check out page 
    const { currUser } = useAuth();
    if (currUser) {
        return children;
    }

    return <Navigate to="/login" replace />
}

export default PrivateRoute
