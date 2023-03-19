import React, { useState } from 'react'
import QRCode from "react-qr-code";
import Dialog from '@mui/material/Dialog';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteRecord } from '../redux/actions/Data';
export default function QrCode({value, open, setOpen}) {
    const dispatch = useDispatch();
  
  
    const handleClose = () => {
          setOpen(false)
    }
    
    const handleDelete = () => {
        dispatch(deleteRecord(value._id))
        .then(() => {
          handleClose()
        })
    }
  
  
  return (
    <Dialog 
    fullScreen={true}
    onClose={handleClose} open={open}
    >
    <AppBar sx={{ position: 'relative' }}>
    
     <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <Box flexGrow={1}/>
            <IconButton
              color="warning"
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Toolbar>
    </AppBar>
    
    <Box display="flex" alignItems="center" justifyContent="center" height="80vh" sx={{background: 'white'}}>
    <div style={{ background: 'white', padding: '16px', margin: '50px' }}>
   {value && value.code && <QRCode 
       size={256}
       style={{ height: "auto", maxWidth: "100%", width: "100%" }}
       value={value.code}
       viewBox={`0 0 256 256`}
    />}
</div>
</Box>
</Dialog>
  )
}
