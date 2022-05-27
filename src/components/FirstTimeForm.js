import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import react, { useEffect, useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { updateProfile } from 'firebase/auth';
import HelloCard from './HelloCard';
import { collection, getDoc, doc, setDoc, updateDoc } from '@firebase/firestore';
import { db } from "../firebase";

export default function FirstTimeForm() {

    const { user } = useUserAuth();
    const [open, setOpen] = useState(true);
    const [name, setName] = useState("");
    const [userData, setUserData] = useState({});

    useEffect(async () => {
        const docRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(docRef);

        const userData = setUserData(userDoc.data());
    },[])

    const updateData = async (name) => {
        await updateDoc(doc(db, "users", user.uid), {
            userName: name,
            isNewUser: false
        });
    }

    const handleNameClick = (e) => {
        updateData(name);
        setOpen(false);
    }

        return (
            <>
            <Dialog open={open}>
                <DialogTitle>Hi... What should we call you?</DialogTitle>
                <DialogContent>
                    <DialogContentText
                    sx={{
                        color: '#FF0000',
                        fontSize: 14
                    }}
                    >
                        This name will be displayed to everyone.
                    </DialogContentText>
                    <TextField
                    onChange={(e) => (
                        setName(e.target.value)
                    )}  
                    required
                    id="username"
                    label="Username"
                    type="text"
                    variant="standard"
                    fullWidth
                    inputProps={{
                        maxLength: 15
                    }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button disabled={!name} onClick={handleNameClick}>Let's go!</Button>
                </DialogActions>
            </Dialog>
            </>
        )
    
}