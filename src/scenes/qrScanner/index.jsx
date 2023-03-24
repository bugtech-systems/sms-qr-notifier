import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import QrReader from 'react-qr-scanner'
import { useEffect, useState } from "react";
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { API_URL } from "../../commonData";
import axios from 'axios';
import moment from 'moment'
import { mockDataContacts } from "../../data/mockData";
import { useSelector } from "react-redux";


const QrScanner = () => {
const {students, isFlush} = useSelector(({dataReducer}) => dataReducer)
const [result, setResult] = useState(null);
const [view, setView] = useState(false);
const [sent, setSent] = useState(false);
  const previewStyle = {
    height: "250px",
    width: "100%",
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
    let value = students.find(a => a.code === data.text);
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
      {result && result._id ?  <Button variant="contained" color="secondary" onClick={() => { setResult(null); setSent(false); 
      }}>
      <span>
      Scan Again</span>
      </Button> :
      <IconButton
      onClick={() => {
        setView(!view) 

        }}
      >
      <FlipCameraIosIcon/>
      </IconButton>}
      <br/>
      {result && result._id ? 
          result && <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column"><p>{result.firstName + ' ' + result.lastName}</p><p>{result.email}</p> {sent && <p>Message Sent!</p>}</Box> : 
      
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
