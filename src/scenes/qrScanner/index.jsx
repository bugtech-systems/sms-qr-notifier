import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import QrReader from 'react-qr-scanner'
import { useState } from "react";


const QrScanner = () => {
const [result, setResult] = useState("No Result")
  const previewStyle = {
    height: "320px",
    width: "100%",
  }
  
  const handleScan = (data) => {
    if(!data) return;
    setResult(data)
  }
  
  
  const handleError = (err) => {
    console.log(err)
  }
  
  
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
        <QrReader
          delay={100}
          style={previewStyle}
          onError={handleError}
          onScan={(e) => handleScan(e)}
          />
      </Box>
      <p>{result}</p>
      
    </Box>
  );
};

export default QrScanner;
