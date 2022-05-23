import React, { useEffect, useState } from 'react';
import NavBar from "../components/NavBar";
import { Box, Divider, Grid, Typography } from '@mui/material';
import { collection, getDoc, onSnapshot, query, where, addDoc, Timestamp, orderBy, setDoc, doc, updateDoc} from '@firebase/firestore';
import { auth, db, storage } from '../firebase';
import { useUserAuth } from '../context/UserAuthContext';
import { useParams } from 'react-router-dom';
import ChatUser from '../components/ChatUser';
import Message from '../components/Message';
import MessageForm from '../components/MessageForm';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';


export const Chats = () => {

    const { userID } = useParams();
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState("");
    const [text, setText] = useState("");
    const [file, setFile] = useState("");
    const [msgs, setMsgs] = useState([]);

    const user1 = userID;

    useEffect(() => {

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("id", "not-in", [user1]));

        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data())
            });
            setUsers(users);
        });

        return () => unsub();

    }, []);
    
    const selectUser = async(user) => {
        setChat(user);

        const user2 = user.id;
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

        const msgsRef = collection(db, 'messages', id, 'chat');
        const q = query(msgsRef, orderBy('createdAt', 'asc'))

        onSnapshot(q, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach(doc => {
                msgs.push(doc.data());
            })
            setMsgs(msgs);
        })

        const docSnap = await getDoc(doc(db, "lastMsg", id))
        if(docSnap.data().from !== user1) {
            await updateDoc(doc(db, 'lastMsg', id), {
                unread: false
            })
        }
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const user2 = chat.id;
        
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

        let url;
        if (file) {
            const fileRef = ref(storage, `file/${new Date().getTime()} - ${file.name}`
            );
            const snap = await uploadBytes(fileRef, file)
            const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
                url = dlUrl;
        }

        await addDoc(collection(db, "messages", id, 'chat'), {
            text: text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || ""
        })

        await setDoc(doc(db, 'lastMsg', id), {
            text: text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || "",
            unread: true,
        });

        setText("");
        setFile("");
    }

    return (
        <>
        <NavBar />
        <Grid container>
            <Grid container className='header-container' sx={{p: 2}}>
                <Typography variant='h4'>
                    Messages
                </Typography>
            </Grid>
            <Divider sx={{ width: "100%"}}/>
            <Grid 
            container 
            className='main-container'
            wrap='nowrap'
            sx={{ height: "100vh" }}
            alignItems="flex-start"
            >
                <Grid 
                container 
                item
                className='users-container'
                xs={3}
                >
                    {users.map(user => <ChatUser 
                                        key={user.id} 
                                        user={user} 
                                        selectUser={selectUser} 
                                        user1={user1} 
                                        chat={chat}/>
                                )
                    }
                </Grid>
                <Divider orientation='vertical'/>
                <Grid 
                container
                item
                direction="column"
                className='chat-container'
                xs={9}
                >
                    <Grid 
                    item 
                    sx={{p: 2}}
                    textAlign="center"
                    >
                        {chat ? <Typography variant='h5'>{chat.userName}</Typography> : <Typography variant='h5'>Select a user to start conversation</Typography>}
                    </Grid>
                    <Divider />
                    <Box
                    overflow="auto"
                    height="90vh"
                    flexDirection="column"
                    display="flex"
                    p={1}
                    >
                        {msgs.length ? msgs.map((msg, i) => <Message key={i} msg={msg} user1={user1} />) : null}
                    </Box>
                    <Grid 
                    item
                    className="form-container"
                    sx={{ borderTop: 1 }}
                    >
                        {chat ? <MessageForm onChange={handleTextChange} onClick={handleSubmit} textValue={text} setFile={setFile}/> : null}
                    </Grid>
                </Grid>                     
            </Grid>
        </Grid>

        </>
    )
}
export default Chats;