import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import react, { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { updateProfile } from 'firebase/auth';
import HelloCard from './HelloCard';

export default function FirstTimeForm() {

    const { user } = useUserAuth();
    const [open, setOpen] = useState(true);
    const [name, setName] = useState("");

    const handleNameClick = (e) => {
        updateProfile(user, { displayName: name });
        setOpen(false);
    }


    if (!user.displayName) {
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
    } else {
        return (
        <HelloCard username={user.displayName} />
        
        )
    }
    
}