import React, { useState } from 'react'
import QRCode from "react-qr-code";
import Dialog from '@mui/material/Dialog';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function QrCode({value, open, setOpen}) {
  
    const handleClose = () => {
          setOpen(false)
    }
  
    console.log(value)
  return (
    <Dialog 
    fullScreen={true}
    onClose={handleClose} open={open}>
    <AppBar sx={{ position: 'relative' }}>
    
     <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          
          </Toolbar>
    </AppBar>
    
    <Box display="flex" alignItems="center" justifyContent="center" height="80vh">
    <div style={{ background: 'white', padding: '16px', margin: '50px' }}>
   {value && value.id &&  <QRCode 
       size={256}
       style={{ height: "auto", maxWidth: "100%", width: "100%" }}
       value={JSON.stringify({id: value.id, name: value.name})}
       viewBox={`0 0 256 256`}
    />}
</div>
</Box>
</Dialog>
  )
}
