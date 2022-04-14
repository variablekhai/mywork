import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { auth } from "../firebase";

function ProtectedRoute({ children }) {

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    if (!user) {
        return <Navigate to="/"/>;
    }
    return children;
};

export default ProtectedRoute;