import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import QrCode from "../../components/QrCode";
import FormDialog from '../../components/FormDialog';
//Redux
import { useSelector } from "react-redux";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {students} = useSelector(({dataReducer}) => dataReducer)
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    // { field: "code", headerName: "Registrar ID" }
    
  ];

  const handleClick = (e) => {
    setSelected(e.row)
    setOpen(true)
  }
  

  
  
  const handleClose = () => {
        setOpen(false)
        setSelected(null)
    
  }
  

  
  return (
    <Box m="20px">
    <QrCode value={selected} open={open} setOpen={handleClose}/>
      <Header
        title="STUDENTS"
        subtitle="List of Students Reference"
      />
    <FormDialog open={dialog} setOpen={setDialog} />
      
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={students}
          columns={columns}
          density="compact"
          components={{ Toolbar: GridToolbar }}
          disableDensitySelector={true}
          onRowClick={handleClick}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
