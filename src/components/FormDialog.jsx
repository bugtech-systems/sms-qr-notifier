import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormContent from '../scenes/form';
import { useDispatch, useSelector } from 'react-redux';


export default function FormDialog({open, setOpen}) {
    
    
    
    
    
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Add Record
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
        <FormContent handleClose={handleClose} />
        </DialogContent>
        <DialogActions>
      
        </DialogActions>
      </Dialog>
    </div>
  );
}
