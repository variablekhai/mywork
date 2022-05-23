import { doc, onSnapshot } from '@firebase/firestore';
import { Grid, Paper, Typography, Avatar, Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

const ChatUser = ({ user1, user, selectUser, chat }) => {

    const user2 = user?.id;
    const [data, setData] = useState('');

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;


    useEffect(() => {
        let unsub = onSnapshot(doc(db, 'lastMsg', id), (doc) => {
            setData(doc.data());
        });

        return () => unsub();
    }, [])

    return (
       <Grid 
       container
       alignItems="center"
       padding={2}
       onClick={() => selectUser(user)}
       sx={{ cursor: "pointer" }}
       className={`${chat.userName === user.userName && "selected-user"}`}
       >
           <Grid item>
               <Avatar src={user.photoURL}/>
           </Grid>
           <Grid item>
               <Typography 
               variant='h6'
               sx={{ ml: 1 }}
               >
                   {user.userName}
                   {data?.from !== user1 && data?.unread && <Chip label="New Messages!" sx={{color: "#fff", backgroundColor: "#00D449", ml: 1}}/>}
               </Typography>
               {data && (
                   <Typography
                    variant='h6'
                    noWrap
                    sx={{ ml: 1, fontSize: 14, textOverflow: 'ellipsis', overflow: "hidden", width: "15rem" }}
                   >
                       <Typography display="inline-block" sx={{ fontSize: 14, fontWeight: 600, mr: 0.5 }}>
                           {data.from === user1 ? "Me: " : null}
                       </Typography>
                       {data.text}
                   </Typography>
               )}
           </Grid>
       </Grid>
    )
}
export default ChatUser;