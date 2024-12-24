import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firbase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

// create auth context
const AuthContext = createContext();
// define use Auth 
export const useAuth = () => {
    return useContext(AuthContext);
}

// google sign in provider 
const googleProvider = new GoogleAuthProvider();

// AuthProvider
export const AuthProvide = ({ children }) => {

    // define users
    const [currUser, setCurrUser] = useState(null);
    // set Loading
    const [loading, setLoading] = useState(true);

    // register to users
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    // Login the user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    // sign up with google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    }

    // logout user
    const logOut = async () => {
        return signOut(auth)
    }

    // manage users profiles
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrUser(user);
            setLoading(false);

            if (user) {
                const { email, displayName, photoUrl } = user;
                const userData = {
                    email, username: displayName, photo: photoUrl
                }
            }
        })
        return () => unsubscribe();
    }, [])

    const value = {
        // if the user is available then pass the
        currUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}