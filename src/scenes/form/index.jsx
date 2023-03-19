import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { SET_STUDENT } from "../../redux/actions/types";
import { createRecord } from "../../redux/actions/Data";
import { useState } from "react";

const Form = ({handleClose}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { student } = useSelector(({dataReducer}) => dataReducer)
  const [errors, setErrors] = useState({
  })
  const dispatch = useDispatch()

  
  const handleChange = prop => e => {
    dispatch({type: SET_STUDENT, payload: {...student, [prop]: e.target.value}})
  };
    
  const handleSubmit = (e) => {
    e.preventDefault();
    if(student.phone.length < 12) return setErrors({phone: "Please enter in this format +639xx"})
    
    
    dispatch(createRecord(student))
    .then(() => {
      handleClose()
    })
    console.log(student)
  }


  return (
    <Box m="20px">
      <Header title="CREATE RECORD" subtitle="Create a New Student Profile" />

        <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                // onBlur={handleBlur}
                onChange={handleChange('firstName')}
                value={student.firstName}
                name="firstName"
                // error={!!touched.firstName && !!errors.firstName}
                // helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                // onBlur={handleBlur}
                onChange={handleChange('lastName')}
                value={student.lastName}
                name="lastName"
                // error={!!touched.lastName && !!errors.lastName}
                // helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                // onBlur={handleBlur}
                onChange={handleChange('email')}
                value={student.email}
                name="email"
                // error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                // onBlur={handleBlur}
                onChange={handleChange('phone')}
                value={student.phone}
                name="phone"
                error={errors.phone && errors.phone}
                helperText={errors.phone ? errors.phone : "Ex: 639774461641"}
                sx={{ gridColumn: "span 4" }}
              />
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
            <Button color="secondary" variant="contained" onClick={() => handleClose()}>
               Close
              </Button>&nbsp;&nbsp;
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
    </Box>
  );
};



export default Form;
