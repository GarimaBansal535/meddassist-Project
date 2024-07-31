import LogoutRounded from '@mui/icons-material/LogoutRounded';
import {Grid, IconButton,AppBar,Box, Toolbar,Paper} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import{Routes,Route} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DisplayAllDoctor from "./DisplayAllDoctors";
import Doctorsinterface from "./Doctorsinterface";
import adminimage from "../assets/admin.jpg"
import ListofDoctors from './ListofDoctors';


export default function AdminDashboard()
{
 var navigate=useNavigate()
  function menuList() {
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/admindashboard/doctorsinterface')}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Doctors" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonSearchIcon/>
                </ListItemIcon>
                <ListItemText primary="Patient" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
        </List>
        </nav>
      </Box>
    );
  }


const appBar=()=>{
    return(
        
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <div style={{fontWeight:'bold',fontSize:26}}>Medassist</div>
                  <IconButton style={{color:"#ffff",marginLeft:'auto'}}>
                    <LogoutRounded />
                   </IconButton>
                  </Toolbar>
              </AppBar>
            </Box>
    )
}
const sideBar=()=>{
return(
<Grid container spacing={3}>
  <Grid item xs={3}>
 <Paper elevation={3} style={{width:200,margin:10,padding:10,display:'flex',alignItems:"center", flexDirection:'column',borderRadius:20,justifyContent:'center'}}>
 <div>
  <img src={adminimage} style={{width:80,height:80,borderRadius:30}}/>
 </div>
 <div style={{fontWeight:12,fontWeight:"bold"}}>Thomas Cook</div>
 <div style={{fontWeight:10,fontWeight:300}}>+91987654321</div>
 <div style={{fontWeight:10,fontWeight:300}}>thomascook@gmail.com</div>
 <div>
  {menuList()}
 </div>
 </Paper>
 </Grid>

 <Grid item xs={9}>
 
   <Routes>
         <Route element={<Doctorsinterface/>} path="/doctorsinterface"/>
          <Route element={<DisplayAllDoctor/>} path="/displayAllDoctor"/>
       
          </Routes>     
 </Grid>
 </Grid>
 )
}
return(<div>
{appBar()}
{sideBar()}
</div>)
}