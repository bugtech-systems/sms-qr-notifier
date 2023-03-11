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
  const previewStyle = {
    height: "250px",
    width: "100%",
  }
  
  const handleSend = async (val) => {
          console.log(val)
          let value = mockDataContacts.find(a => a.id === val);
            console.log(value)
          let msg = `Hi there, ${val.name} Scanned Qr at ${moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}. Thank you!`;
          console.log(msg)
      // await axios.post(`${API_URL}/send`, {})
      // .then(({data}) => {
      //   console.log(data)
      // }).catch(err => {
      //   console.log(err)
      // })
  
  
  }
  
  
  const handleScan = (data) => {
    if(!data) return ;
    setResult(data);
    handleSend(data)
  }
  
  
  const handleError = (err) => {
    console.log(err)
  }
  
  
  useEffect(() => {
        return () => {
          setResult(null)
        }
  }, [])
  
  console.log(result)
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
      {result && result.text ?  <Button variant="contained" color="secondary" onClick={() => setResult(null)}>
      <span>
      Scan Again</span>
      </Button> :
      <IconButton
        onClick={() => setView(!view)}
      >
      <FlipCameraIosIcon/>
      </IconButton>}
      <br/>
      {result && result.text ? 
          result && <p>{result.text}</p> : 
      
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
