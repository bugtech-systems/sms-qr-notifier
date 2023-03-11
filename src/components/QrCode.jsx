import React, { useState } from 'react'
import QRCode from "react-qr-code";
import Dialog from '@mui/material/Dialog';


export default function QrCode({value, open, setOpen}) {
  
    const handleClose = () => {
          setOpen(false)
    }
  
    console.log(value)
  return (
    <Dialog onClose={handleClose} open={open}>
    <div style={{ background: 'white', padding: '16px' }}>
   {value && value.id &&  <QRCode 
       size={256}
       style={{ height: "auto", maxWidth: "100%", width: "100%" }}
       value={JSON.stringify({id: value.id, name: value.name})}
       viewBox={`0 0 256 256`}
    />}
</div>
</Dialog>
  )
}
