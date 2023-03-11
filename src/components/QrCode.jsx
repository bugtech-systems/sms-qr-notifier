import React, { useState } from 'react'
import QRCode from "react-qr-code";
import Dialog from '@mui/material/Dialog';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { encryptData } from '../scenes/qrScanner/cryptoEncrypt';

export default function QrCode({value, open, setOpen}) {
  
    const handleClose = () => {
          setOpen(false)
    }
  
  
    console.log(value && value.registrarId)
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
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          
          </Toolbar>
    </AppBar>
    
    <Box display="flex" alignItems="center" justifyContent="center" height="80vh" sx={{background: 'white'}}>
    <div style={{ background: 'white', padding: '16px', margin: '50px' }}>
   {value && value.registrarId && <QRCode 
       size={256}
       style={{ height: "auto", maxWidth: "100%", width: "100%" }}
       value={JSON.stringify(value.registrarId)}
       viewBox={`0 0 256 256`}
    />}
</div>
</Box>
</Dialog>
  )
}
