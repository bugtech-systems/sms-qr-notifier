import { Box, Button, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import QrReader from 'react-qr-scanner'
import { useEffect, useState, useRef } from "react";
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { API_URL } from "../../commonData";
import axios from 'axios';
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { getAttendance, scanCode } from "../../redux/actions/Data";









const QrScanner = () => {
const {students, isFlush} = useSelector(({dataReducer}) => dataReducer);
const dispatch = useDispatch()
const [result, setResult] = useState(null);
const [view, setView] = useState("qr");
const [sent, setSent] = useState(false);

  
  
  
  const previewStyle = {
    height: "250px",
    width: "100%",
  }
  
  
  const handleChange = (e, newValue) => {
    if (newValue !== null) {
    console.log(newValue)
      setView(newValue);
    }
  }
  
  const handleScan = (data) => {
    if(result) return;
    if(!data) return ;
    
    if(data.length >= 10) {
    dispatch(scanCode(data, isFlush))
    .then((val) => {
    console.log(val)
    console.log('weaewa')
      dispatch(getAttendance());
       setResult(val.data);

        setSent(true)
    })
    .catch(err => {
      console.log(err)
    })
  }
  }
  
  
  const handleError = (err) => {
    console.log(err)
  }
  
  
  useEffect(() => {
  
        return () => {
          setResult(null)
        }
  }, [])
  
  return (
    <Box m="20px"
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="QR SCANNER" subtitle="Scan QR Code" />
        <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleChange}
        aria-label="device"
      >
        <ToggleButton value="qr" aria-label="qr">
          <QrCodeScannerIcon />
        </ToggleButton>
        <ToggleButton value="rfid" aria-label="rfid">
          < DocumentScannerIcon/>
        </ToggleButton>
      </ToggleButtonGroup>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      > 
      {result && result._id ? <Box display="flex" flexDirection="column" justifyContent="center">  
          <Typography textAlign="center" color={result.isPresent ? "secondary" : "red"} variant="h4" >{result.isPresent ? 'ENTERING' : 'EXITING'}</Typography>
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column"><h3>{result.firstName + ' ' + result.lastName}</h3><small>{result.email}</small> {sent && <p>Message Sent!</p>}</Box>
          <br/>
          <Button variant="contained" color="secondary" onClick={() => { setResult(null); setSent(false); 
      }}>
      <span>
      Scan Again</span>
      </Button>
          </Box>: 
    view === "qr" ? 
          <QrReader
          delay={100}
           style={previewStyle}
           onError={handleError}
           onScan={(e) => handleScan(e && e.text)}
           />
           :
            <TextField
              autoFocus={true}
              variant="outlined"
              onChange={(e) => handleScan(e.target.value)}
            />
       }
      </Box>
      
    </Box>
  );
};

export default QrScanner;
