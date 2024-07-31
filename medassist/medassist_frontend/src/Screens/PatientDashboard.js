import LogoutRounded from '@mui/icons-material/LogoutRounded';
import { Grid, IconButton, AppBar, Box, Toolbar, Paper, TextField, InputAdornment } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Routes, Route, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import QuestionInterface from "./QuestionInterface";
import adminimage from "../assets/admin.jpg";
import QuestionQueryInterface from "./QuestionQueryInterface";
import ListofDoctors from './ListofDoctors';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import PatientCard from './PatientCard';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import SelectedDoctor from './SelectedDoctor';
import PatientQuestioner from './PatientQuestioner';

export default function PatientDashboard(props) {
  var [pattern, setPattern] = useState('')
  var navigate = useNavigate()
  const location = useLocation();
  var user = useSelector((state) => state.user)
  var [status, setStatus] = useState(true)
  var userData = Object.values(user)[0]
  
  // alert(JSON.stringify(location.state?.status))

  function menuList() {
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/doctordashboard/questioninterface')}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Add Question" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/doctordashboard/questionqueryinterface')}>
                <ListItemIcon>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Add Option" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonSearchIcon />
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


  const appBar = () => {
    return (

      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ background: "#22a6b3" }} position="static">
          <Toolbar >
            <div style={{ fontWeight: 'bold', fontSize: 26 }}>Medassist</div>
            <div style={{ marginLeft: '23%', background: "#ffff", width: 550, padding: 2, borderRadius: 5 }}>
              <TextField size='small' onChange={(event) => setPattern(event.target.value)} fullWidth
                sx={{ border: 'none', "& fieldset": { border: 'none' }, }}
                placeholder='Search Doctor Here......'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
              /></div>
            <IconButton style={{ color: "#ffff", marginLeft: 'auto' }}>
              <LogoutRounded />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
  const sideBar = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper elevation={3} style={{ width: 250, margin: 10, padding: 10, display: 'flex', alignItems: "center", flexDirection: 'column', borderRadius: 20, justifyContent: 'center' }}>
            <div>
              <img src={adminimage} style={{ width: 80, height: 80, borderRadius: 30 }} />
            </div>
            <div style={{ fontWeight: 12, fontWeight: "bold" }}>{userData.username}</div>
            <div style={{ fontWeight: 10, fontWeight: 300 }}>+91{userData.usernum}</div>
            <div style={{ fontWeight: 10, fontWeight: 300 }}>{userData.useremail}</div>
            <div>
              {menuList()}
            </div>
          </Paper>
        </Grid>

        <Grid item xs={9}>
          {location.state?.status ? <ListofDoctors pattern={pattern} setStatus={setStatus} /> : <></>}
          {status?<ListofDoctors pattern={pattern} setStatus={setStatus}/>:<></>}
          <Routes>

       
            <Route element={<ListofDoctors />} path="/listofdoctors" />
            <Route element={<PatientCard />} path="/patientcard" />
            <Route element={<SelectedDoctor />} path="/selecteddoctor" />
            <Route element={<PatientQuestioner />} path="/patientquestioner" />
          </Routes>
        </Grid>
      </Grid>
    )
  }
  return (
    <div>

      {appBar()}
      {sideBar()}
    </div>)
}