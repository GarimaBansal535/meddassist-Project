import DisplayAllDoctor from "./Screens/DisplayAllDoctors";
import DisplayTime from "./Screens/DisplayTime";
import Doctorsinterface from "./Screens/Doctorsinterface";
import Timeinterface from "./Screens/Timeinterface";
import Userregistration from "./Screens/Userregistration";
import DoctorLogin from "./Screens/DoctorLogin";
import DoctorDashboard from "./Screens/DoctorDashboard";
import Adminlogin from "./Screens/Adminlogin";
import AdminDashboard from "./Screens/AdminDashboard";
import PatientLogin from "./Screens/PatientLogin";
import PatientDashboard from "./Screens/PatientDashboard";
import ListofDoctors from "../src/Screens/ListofDoctors";
import PatientCard from "../src/Screens/PatientCard"



import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
         
          <Route element={<Timeinterface/>} path="/timeinterface"/>
          <Route element={<DisplayTime/>} path="/displaytime"/>
          <Route element={<Userregistration/>} path="/userregistration"/>
          <Route element={<Adminlogin/>} path="/Adminlogin"/>
          <Route element={<AdminDashboard/>} path="/admindashboard/*"/>
          <Route element={<DoctorLogin/>} path="/doctorlogin"/>
          <Route element={<DoctorDashboard/>} path="/doctordashboard/*"/>
          <Route element={<PatientLogin/>} path="/patientlogin"/>
          <Route element={<PatientDashboard/>} path="/patientdashboard/*"/>
          <Route element={<ListofDoctors/>} path="/listofdoctors"/>
          <Route element={<PatientCard/>} path="/patientcard"/>
        </Routes>
      </Router>
    </div>
   
  );
}

export default App;
