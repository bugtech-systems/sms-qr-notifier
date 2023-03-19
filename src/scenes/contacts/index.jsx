import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import QrCode from "../../components/QrCode";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from '../../redux/actions/Data';

const Contacts = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  const [students, setStudents] = useState([])
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

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
    { field: "code", headerName: "Registrar ID" }
    
  ];

  const handleClick = (e) => {
    setSelected(e.row)
    setOpen(true)
  }
  
  const handleGetStudents = () => {
    dispatch(getAllStudents())
    .then((data) => {
      console.log(data);
      let newStudents = data.map(doc => {
        return {id: doc._id, ...doc}
      }) 
        setStudents(newStudents)
    })
    .catch(err => {
    console.log(err)})
  }
  
  
  const handleClose = () => {
        setOpen(false)
        setSelected(null)
    
  }
  
  useEffect(() => {
    handleGetStudents()
  }, [])
  console.log(students)
  console.log(mockDataContacts)
  
  return (
    <Box m="20px">
    <QrCode value={selected} open={open} setOpen={handleClose}/>
      <Header
        title="STUDENTS"
        subtitle="List of Students Reference"
      />
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
