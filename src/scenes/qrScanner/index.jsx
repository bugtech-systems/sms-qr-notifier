import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import QrReader from 'react-qr-scanner'
import { useEffect, useState } from "react";
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';

const QrScanner = () => {
const [result, setResult] = useState(null);
const [view, setView] = useState(false);
  const previewStyle = {
    height: "320px",
    width: "100%",
  }
  
  const handleScan = (data) => {
    if(!data) return ;
    setResult(data)
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
      <IconButton
        onClick={() => setView(!view)}
      >
      <FlipCameraIosIcon/>
      </IconButton>
      {view ? 
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
      {result && <p>{JSON.stringify(result)}</p>}
      </Box>
      
    </Box>
  );
};

export default QrScanner;
