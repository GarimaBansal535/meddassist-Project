
import { AppBar, Box, Toolbar, Paper, Button } from "@mui/material";
import { imageURL } from "../services/FetchDjangoServices";
import adminimage from "../assets/admin.jpg";

export default function PatientCard(props) {

  
  const appBar = () => {
    return (

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ height: 80, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
          <Toolbar>
            <div style={{ fontWeight: 'bold', fontSize: 26 }}>Medassist</div>

          </Toolbar>
        </AppBar>
      </Box>
    )
  }

  return (<div>
    {appBar()}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column", height: 560 }}>
      <Paper elevation={2} style={{ width: '96%', height: 120, background: '#f2f2f2', margin: 5, padding: 10, display: 'flex', alignItems: "center" }}>
        <div style={{ fontFamily: 'kanit', fontSize: 24, fontWeight: 'bold', textAlign: 'left', marginTop: 10 }}>
          Introduction
        </div>
        <div style={{ margin: 35, display: "Flex", justifyContent: 'center' }}>
          <Button style={{ background: "#9EDDFF", width: 400, }} variant="contained" href="#contained-buttons" >Select</Button>
        </div>
      </Paper>

      <div style={{ width: '100%', height: 150, display: 'flex', alignContent: 'center', flexDirection: 'column' }}>
        <div style={{ fontFamily: 'kanit', fontSize: 24, fontWeight: 'bold', textAlign: 'left' }}>Your Doctor</div>
        <Paper elevation={2} style={{ width: '96%', height: 95, background: '#f2f2f2', margin: 5, padding: 10, display: 'flex' }}>
        
          <div style={{display:'flex', justifyContent:'center', alignItems:"center"}}> 
            <img src={adminimage} style={{width:100,height:100,borderRadius:50}}/> 
          </div> 
           
           <div style={{fontFamily:'kanit',fontSize:18,fontWeight:'bold',textAlign:'Right',margin: '0px 0px 0px 30px'}}>
            Dr. rrrrrrr
           </div> 

          <div style={{ margin: 35, display: "flex", justifyContent:'center', alignItems:"center"}}>
            <Button style={{ background: "#9EDDFF", width: 400}} variant="contained" href="#contained-buttons" >Next</Button>
          </div>
        </Paper></div>
    </div>
  </div>)
}