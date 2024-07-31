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
import QuestionInterface from "./QuestionInterface";
import adminimage from "../assets/admin.jpg";
import QuestionQueryInterface from "./QuestionQueryInterface";
import { imageURL } from '../services/FetchDjangoServices';
import PatientList from './PatientList';
import Prescriptioninterface from './Prescriptioninterface';
import Prescriptionpdf from './Prescriptionpdf';

export default function DoctorDashboard()
{
  var doctor=JSON.parse(localStorage.getItem('DOCTOR'))
  // console.log("lllllllllll",doctor)
  var navigate=useNavigate()
  function menuList() {
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/doctordashboard/questioninterface')}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Add Question" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/doctordashboard/questionqueryinterface')}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Add Option" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/doctordashboard/patientlist')}>
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
 <Paper elevation={3} style={{width:250,margin:10,padding:10,display:'flex',alignItems:"center", flexDirection:'column',borderRadius:20,justifyContent:'center'}}>
 <div>
  <img src={`${imageURL}${doctor.photograph}`} style={{width:80,height:80,borderRadius:30}}/>
 </div>
 <div style={{fontWeight:12,fontWeight:"bold"}}>{doctor.doctorname}</div>
 <div style={{fontWeight:10,fontWeight:300}}>+91{doctor.mobileno}</div>
 <div style={{fontWeight:10,fontWeight:300}}>{doctor.emailid}</div>
 <div>
  {menuList()}
 </div>
 </Paper>
 </Grid>

 <Grid item xs={9}>
   <Routes>
          <Route element={<QuestionInterface/>} path="/questioninterface"/>
          <Route element={<QuestionQueryInterface/>} path="/questionqueryinterface"/>
          <Route element={<PatientList/>} path="/patientlist"/>
          <Route element={<Prescriptioninterface/>} path="/ps"/>
          <Route element={<Prescriptionpdf/>} path="/ppdc"/>
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