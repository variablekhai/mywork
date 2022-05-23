import { CardMedia, getFilledInputUtilityClass, Grid, IconButton, Link, Paper, Typography } from "@mui/material";
import Moment from 'react-moment';
import React, { useRef, useEffect, useState } from 'react';
import { storage } from "../firebase";
import { getDownloadURL, getStorage, ref, getMetadata} from "firebase/storage";
import FileOpenIcon from '@mui/icons-material/FileOpen';

const Message = ({ msg, user1 }) => {

    const scrollRef = useRef()
    const [url, setURL] = useState("");
    const [metadata, setMetadata] = useState("");

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
        if (msg.media) {
            const getFile = async() => {
                const mediaRef = ref(storage, msg.media);
          
                await getDownloadURL(mediaRef).then((url) => {
                    setURL(url);
                })
                await getMetadata(mediaRef).then((meta) => {
                    setMetadata(meta);
                })
            }
            getFile();
        }
    }, [msg])
        

    return (
        <Grid item sx={{ p: 0.5 }} className={`chat-wrapper ${msg.from === user1 ? "own" : ""}`} ref={scrollRef}>
            <Paper className={msg.from === user1 ? "me" : "friend"} elevation={0} sx={{ p: 0.5, borderRadius: 5 }}>
                <Typography sx={{ color: "#fff", mx: 1 }}>
                    {msg.text}
                    {msg.media ? <Link sx={{ color: "#fff", display: "block" }} underline="hover" href={url}><IconButton sx={{ color: "#fff" }}><FileOpenIcon/></IconButton>{metadata.name}</Link> : null}
                </Typography>
                <Typography fontSize={10} fontWeight="light" textAlign="right" sx={{ mx: 1.5, color: "#fff" }}>
                    <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                </Typography>
            </Paper>
        </Grid>
    )
}
export default Message;