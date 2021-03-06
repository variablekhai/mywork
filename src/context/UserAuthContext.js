import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    getAdditionalUserInfo
} from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "@firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState("");

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password).then(cred => {
            return setDoc(doc(db, "users", cred.user.uid), {
                id: cred.user.uid,
                userName: "",
                email: cred.user.email,
                photoURL: "",
                phoneNo: "",
                bio: "",
                skills: [],
                isNewUser: true
            })
        });

    }
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);

    }
    function logOut() {
        return signOut(auth);
    }

    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider).then(cred => {
            if (getAdditionalUserInfo(cred).isNewUser) {
                return setDoc(doc(db, "users", cred.user.uid), {
                    id: cred.user.uid,
                    userName: "",
                    email: cred.user.email,
                    photoURL: "",
                    phoneNo: "",
                    bio: "",
                    skills: [],
                    isNewUser: true
                })
            }
        })
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });
        return () => {
            unsubcribe();
        }
    }, []);

    return (
        <userAuthContext.Provider value={{user, signUp, logIn, logOut, googleSignIn}}>
            { children }
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext)
}