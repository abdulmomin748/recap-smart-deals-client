import React, {  useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../firebase/firebase.init';
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const unSubsCribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false);
        });
        () => unSubsCribe();
    },[])

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }
    const logOut = () => {
        return signOut(auth);
    }

    const userInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signInGoogle,
        logOut
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;