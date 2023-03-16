import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import QrReader from 'react-qr-scanner'
import { useEffect, useState } from "react";
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { API_URL } from "../../commonData";
import axios from 'axios';
import moment from 'moment'
import { mockDataContacts } from "../../data/mockData";


const QrScanner = () => {
const [result, setResult] = useState(null);
const [view, setView] = useState(false);
const [sent, setSent] = useState(false);
  const previewStyle = {
    height: "250px",
    width: "100%",
  }
  
  const handleSend = async (value) => {
        
    
    
          let message = `Hi there, ${value.name} Scanned Qr at ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}. Thank you!`;
      await axios.post(`${API_URL}/send`, {phone: value.phone, message, isFlush: true})
      .then(({data}) => {
        console.log(data)
        setSent(true)
      }).catch(err => {
        console.log(err)
      })
  
  
  }
  
  
  const handleScan = (data) => {

    if(!data) return ;
    let value = mockDataContacts.find(a => a.registrarId == data.text);

    
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

      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      > 
      {result && result.id ?  <Button variant="contained" color="secondary" onClick={() => { setResult(null); setSent(false); 
    navigator.geolocation.getCurrentPosition((val) => alert(JSON.stringify(val)));
          
      }}>
      <span>
      Scan Again</span>
      </Button> :
      <IconButton
      onClick={() => {
        setView(!view) 
        navigator.geolocation.getCurrentPosition(({coords}) => console.log({lat: coords.latitude, lng: coords.longitude}));

        }}
      >
      <FlipCameraIosIcon/>
      </IconButton>}
      <br/>
      {result && result.id ? 
          result && <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column"><p>{result.name}</p> {sent && <p>Message Sent!</p>}</Box> : 
      
      view ? 
        <QrReader
         key="environmentQR"
          delay={100}
          facingMode="rear"
          style={previewStyle}
          onError={handleError}
          onScan={(e) => handleScan(e)}
          />
          : 
          <QrReader
          key="userQr"
          facingMode="front"
          delay={100}
           style={previewStyle}
           onError={handleError}
           onScan={(e) => handleScan(e)}
           />
       }
      </Box>
      
    </Box>
  );
};

export default QrScanner;
