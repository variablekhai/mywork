import { Grid, IconButton, OutlinedInput, Button, Input } from '@mui/material';
import React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const MessageForm = (props) => {
    return(
        <Grid container sx={{ p: 2 }} justifyContent="center" gap={1}>
            <label htmlFor="icon-button-file">
                <Input sx={{ display: "none" }} id="icon-button-file" type="file" onChange={e => props.setFile(e.target.files[0])} />
                <IconButton sx={{ color: "#666666" }} aria-label="upload file" component="span">
                    <AttachFileIcon />
                </IconButton>
            </label>
            <Grid item xs={10}>
                <OutlinedInput size='small' fullWidth placeholder='Message...' onChange={props.onChange} value={props.textValue}/>
            </Grid>
            <Button variant="contained" sx={{ color: "#fff" }} onClick={props.onClick}>
                Send
            </Button>
        </Grid>
    )
}
export default MessageForm;