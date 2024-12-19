import { createContext, useContext, useState } from "react";

// create auth context
const AuthContext = createContext();
// define use Auth 
export const useAuth = () => {
    return useContext(AuthContext);
}

// AuthProvider
export const AuthProvide = ({ children }) => {

    // define users
    const [currUser, setCurrUser] = useState(null);
    // set Loading
    const [loading, setLoading] = useState(true);

    // register to users
    const registerUser = async () => {

    }


    const value = {
        // if the user is available then pass the
        currUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}