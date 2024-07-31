import { Paper, Button } from "@mui/material";
import { imageURL } from "../services/FetchDjangoServices";

import PatientCard from "../Screens/PatientCard";

export default function DoctorCard(props) {
   
    
    const handleClick = (index) => {
        props.setSelectedDoctor(index)
        props.setDDoctor(props.data)
       
    }
    return (
        <Paper onClick={() => handleClick(props.i)} elevation={2} style={{ width: 200, height: 'auto', background: props.i == props.selectedDoctor ? '#EBE4D1' : '#f2f2f2', margin: '0px 0px 12px 12px', padding: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                <img src={`${imageURL}${props.data.photograph}`} style={{ width: 100, height: 100, borderRadius: 50 }} />
            </div>
            <div style={{ fontFamily: 'kanit', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>
                Dr. {props.data.doctorname}
            </div>
            <div style={{ fontFamily: 'kanit', fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginTop: 5 }}>
                {props.data.qualification}
            </div>
            <div style={{ fontFamily: 'kanit', fontSize: 10, fontWeight: 'bold', textAlign: 'center', marginTop: 5 }}>
                {props.data.emailid}
            </div>
            <div style={{ margin: 10, alignSelf: 'center' }}>
                {/* <Button fullWidth style={{background:"#9EDDFF"}} variant="contained"  >Select</Button> */}
            </div>
        </Paper>
    )
}