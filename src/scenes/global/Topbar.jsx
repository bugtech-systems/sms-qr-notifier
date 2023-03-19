import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_FLUSH } from "../../redux/actions/types";

const Topbar = ({setIsCollapsed}) => {
  const theme = useTheme();
  const { isFlush } = useSelector(({dataReducer}) => dataReducer);
  const dispatch = useDispatch()
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  let {pathname} = useLocation();
    
      

    
    console.log(pathname)
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
   
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
              <Box
              display="flex"
              backgroundColor={colors.primary[400]}
              borderRadius="3px"
                // ml="15px"
              >
                {/* <Typography variant="h3" color={colors.grey[100]}>
                  ADMINS
                </Typography> */}
                <IconButton onClick={setIsCollapsed}
            
                >
                  <MenuOutlinedIcon />
                </IconButton>
                <FormGroup>
                   <FormControlLabel control={<Switch color="secondary" checked={isFlush} onChange={() => dispatch({type: SET_FLUSH, payload: !isFlush})} />} label="Flash" />
                </FormGroup>
              </Box>

      {/* ICONS */}
      <Box display="flex">
       <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
         {/* 
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <IconButton
            component={Link}
            to={ pathname === '/qr-scanner' ? "/" : "/qr-scanner"}
        >
        { pathname === '/qr-scanner' ? <HomeOutlinedIcon/> : <QrCodeScannerIcon/> }
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
