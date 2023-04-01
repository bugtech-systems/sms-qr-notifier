import { Box, Button, IconButton, TextField, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import QrReader from 'react-qr-scanner'
import { useEffect, useState, useRef } from "react";
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { API_URL } from "../../commonData";
import axios from 'axios';
import moment from 'moment'
import { mockDataContacts } from "../../data/mockData";
import { useSelector } from "react-redux";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import useAutoFocus from "../hooks/useAutoFocus";




function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}











const QrScanner = () => {
const {students, isFlush} = useSelector(({dataReducer}) => dataReducer)
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
  
  const handleSend = async (value) => {
          let message = `Hi there, ${value.firstName} ${value.lastName} Scanned Qr at ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}. Thank you!`;
      await axios.post(`${API_URL}/text/send`, {phone: value.phone, message, isFlush})
      .then(({data}) => {
        console.log(data)
        setSent(true)
      }).catch(err => {
        console.log(err)
      })
  }
  
  
  const handleScan = (data) => {
    if(result) return;
    if(!data) return ;
    let value = students.find(a => a.code === data);
    setResult(value);
    handleSend(value)
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
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column"><h3>{result.firstName + ' ' + result.lastName}</h3><p>{result.email}</p> {sent && <p>Message Sent!</p>}</Box>
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
