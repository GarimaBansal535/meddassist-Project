import { useEffect, useState } from "react"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { FormHelperText,
  Avatar,
  Button, 
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid, FormControl,
  FormLabel, InputLabel, Select, MenuItem, TextField, fabClasses } from "@mui/material";
import { getData,imageURL,postData,serverURL } from "../services/FetchDjangoServices"
import MaterialTable from "@material-table/core"
import makeStyles from "@mui/styles/makeStyles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Heading from "../component/Heading";
import Swal from "sweetalert2";
import { json } from "react-router-dom";
import { EditRounded } from "@mui/icons-material";
import adddoctor from "../assets/adddoctor.png"
import doctorimage from "../assets/doctor.png"


const useStyles = makeStyles((theme) => ({
  rootcontainer: {
    width: "auto",
    height: "auto",
    
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rootbox: {
    width: "auto",
    height: "auto",
    background: "#fff",
    borderRadius: 10,
    padding: 15,
  },
  container: {
    width: '100%',
    height: '100%',
    background: '#f2f2f2',
    display: 'flex',
  
  },
  box: {
    width: 800,
    height: '80%',
    background: '#ffff',
    borderRadius: 10,
    padding: 15,
    marginLeft:'8%',
    marginTop:'2%'
  }
}));
export default function DisplayAllDoctor() {
  var classes = useStyles()
  const [doctorlist, setDoctorList] = useState([])
  const [open,setOpen]=useState(false)
  const [over,setOver]=useState(false)

  /***************doctor interface************************/
  const [states, setStates] = useState([])
  const [doctorId, setDoctorId] = useState('')
  const [city, setCity] = useState([])
  const [category, setCategory] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [doctorName, setDoctorName] = useState('')
  const [dob, setDob] = useState('1/1/1')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [stateid, setStateId] = useState('')
  const [cityid, setCityId] = useState('')
  const [qualification, setQualificationId] = useState('')
  const [emailid, setEmailId] = useState('')
  const [mobileno, setMobileno] = useState('')
  const [password, setPassword] = useState('')
  const [photograph, setPhotograph] = useState({ url: '', bytes: '' })
  const [formError,setFormError] = useState({})
  const [btnStatus,setBtnStatus] = useState(false)
  const [tempPicture,setTempPicture] = useState('')



  const handleError=(error,label)=>{
    setFormError((prev)=>({...prev,[label]:error}))
    console.log("Error",formError)

  }

  const isError=()=>{
    var error=false
     if(categoryId.length==0)
     {
      handleError('Please Select Category Id','categoryid')
      error=true
     }
     if(doctorName.length==0)
     {
      handleError('Doctor Name Should Not Be Blank','doctorname')
      error=true
     }
     if(gender.length==0)
     {
      handleError('Gender Should Not Be Blank','gender')
      error=true
     }
     if(dob.length==0)
   {
    handleError('Pls input DOB','dob')
    error=true
     }
     if(address.length==0)
     {
      handleError('Pls Input Address','address')
      error=true
     }
     if(stateid.length==0)
     {
      handleError('Select State..','stateid')
      error=true
     }
     if(cityid.length==0)
   {
    handleError('Select City','cityid')
    error=true
   }
   if(emailid.length==0 || !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(emailid))
   {
    handleError('Please Input Email Id','emailid')
    error=true
   }
   if(mobileno.length==0 || !(/^[0-9]{10}$/).test(mobileno))
   {
    handleError('Pls Input Correct Mobile Number','mobileno')
    error=true
   }
   if(qualification.length==0)
   {
    handleError('Pls Input Qualification','qualification')
    error=true
   }
  //  if(photograph.bytes.length==0)
  //  {
  //   handleError('Pls Upload Picture','photograph')
  //   error=true
  //  }
     
    return error
  }

  const fecthAllStates = async () => {
    var data = await getData('statelist')
    setStates(data)


  }
  const fecthAllCategory = async () => {
    var data = await getData('categorylist')
    setCategory(data)


  }

  const fillStates = () => {
    return states.map((item) => {
      return <MenuItem value={item.id}>{item.statename}</MenuItem>
    })

  }

  const fillCategory = () => {
    return category.map((item) => {
      return <MenuItem value={item.id}>{item.categoryname}</MenuItem>
    })

  }
  const fecthAllCity = async (sid) => {
    var body = { id: sid }
    var data =await postData('citylist', body)
    setCity(data)
}

  const fillCity = () => {
    return city.map((item) => {
      return <MenuItem value={item.id}>{item.cityname}</MenuItem>;
    })
  }

  const handleStateChange = (event) => {
    fecthAllCity(event.target.value)
    setStateId(event.target.value)

  }

  useEffect(function () {
    fecthAllStates()
    fecthAllCategory()
  
  }, [])

  const handlePhotograph = (event) => {
    setPhotograph({ 
       url: URL.createObjectURL(event.target.files[0]),
       bytes: event.target.files[0] })
       setBtnStatus(true)
  }

  const handleSubmit = async () => {
    if(!isError())
    {

    var body= {"id":doctorId,"category":categoryId,"doctorname":doctorName,
    "gender":gender,"dob":dob,"address":address,"states":stateid,"city":cityid,
    "qualification":qualification,"emailid":emailid,"mobileno":mobileno,"photograph":photograph.bytes}
  
    var result = await postData("doctoredit", body);
    if (result.status) {
     Swal.fire({
        icon: 'success',
        title: result.message,
        showConfirmButton: false,
        timer: 1000
      })
      fecthAllDoctors()
    }
   
    else {
      Swal.fire({

        icon: 'error',
        title: result.message,
        showConfirmButton: false,
        timer: 1000
      })
    }
  }
  };


  /********************dd******************/

  const fecthAllDoctors = async () => {
    var result = await getData('doctorlist')
    setDoctorList(result)
  }

  useEffect(function () {
    fecthAllDoctors()

  }, [])
  const handleClose=()=>{
    setOpen(false)
  }
  const handleEdit=(rowData)=>{
  fecthAllCity(rowData.states.id)  
  setDoctorId(rowData.id)
  setDoctorName(rowData.id)
  setCategoryId(rowData.category.id)
  setDoctorName(rowData.doctorname)
  setGender(rowData.gender)
  setDob(rowData.dob)
  setQualificationId(rowData.qualification)
  setStateId(rowData.states.id)
  setCityId(rowData.city.id)
  setAddress(rowData.address)
  setEmailId(rowData.emailid)
  setMobileno(rowData.mobileno)
  setPhotograph({ url:`${imageURL}${rowData.photograph}`, bytes: "" })
  setTempPicture(`${imageURL}${rowData.photograph}`)

    setOpen(true)
  }


  const handleDelete=async(rowData)=>{
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
       
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body={'id':rowData.id}
        
        var result=await postData('doctordelete',body)
        if(result.status)
        {
  
        Swal.fire('Deleted!', '', 'success')
        fecthAllDoctors()
        }
        else
        {
          Swal.fire('Server Error!', '', 'error')
        }
      } else if (result.isDenied) {
        Swal.fire('Record not deleted', '', 'info')
      }
    })
  
  
  }
 const saveCancel=()=>{
  return(<div>
    <Button onClick={handleEditPicture}>Save</Button>
    <Button onClick={handleCancel}>Cancel</Button>
  </div>)
 }

 const handleEditPicture=async()=>{
 
  var formData = new FormData();
  formData.append("id", doctorId);
  
  formData.append("photograph", photograph.bytes);
  

  var result = await postData("doctorpictureedit", formData);
  if (result.status) {
    Swal.fire({
      icon: "success",
      title: result.message,
      showConfirmButton: false,
      timer: 5000,
    });
    fecthAllDoctors()
    setBtnStatus(false)
  } else {

    Swal.fire({
      icon: "error",
      title: result.message,
      showConfirmButton: false,
      timer: 5000,
    });
  }


}


 const handleCancel=()=>{
  setPhotograph({url:tempPicture,byte:""})
  setBtnStatus(false)
 }

 const showPen=()=>{


 }

  const showDoctor=()=>{
    return (
      <div className={classes.rootcontainer}>
        <div className={classes.rootbox}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Heading icon="Doctor.png" text="Doctor Register" color="#05BFDB" />
            </Grid>


            <Grid item xs={12} style={{ display: 'flex', alignItem: 'center', justifyContent: 'right' }}>
             
             <Button style={{position:'relative',background:'#ffff'}} variant="text" component='label'>
                
                 <input 
                 error={formError.photograph}
                 onFocus={()=>handleError('','photograph')}
   
                 onChange={handlePhotograph} 
                 type="file" 
                 hidden 
                 accept="image/*" 
                 multipule  />
         
 
               {over?<div style={{display:'flex',justifyContent:'center',alignItems:'center',bottom:3,left:3,position:'absolute',width:26,height:26,borderRadius:13, background:'#f2f2f2',zIndex:2}}><EditRoundedIcon style={{color:'#000',fontSize:16}}/></div>:<></>}
               <Avatar
               onMouseOver={()=>setOver(true)}
               onMouseLeave={()=>setOver(false)}
                 alt="Doctor Image"
                 src={photograph.url}
                 variant="circular"
                 sx={{ width: 90, height: 90 }}
               />
                </Button>
               {btnStatus?saveCancel():<></>}
             
             </Grid>
   


            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select 
                  error={formError.categoryid}
                 onFocus={()=>handleError('','categoryid')}
                 label="Category"
                 value={categoryId}
                  onChange={(event) => setCategoryId(event.target.value)}
                >
                <MenuItem>Category</MenuItem>
                  {fillCategory()}
                </Select>
                {formError.categoryid?<FormHelperText style={{color:'red'}} >{formError.categoryid}</FormHelperText>:<></>}
              </FormControl>
            </Grid>
           
            

  
            <Grid item xs={6}>
              <TextField 
               error={formError.doctorname}
               onFocus={()=>handleError('','doctorname')}
              onChange={(event) => setDoctorName(event.target.value)} 
              label="Doctor Name" 
              value={doctorName}
              helperText={formError.doctorname}
              fullWidth />
              </Grid>
  
  
            <Grid item xs={6}>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row>
                  <FormControlLabel
                  error={formError.gender}
                  onFocus={()=>handleError('','gender')}
                    value="Female"
                    control={<Radio />}
                    label="Female"
                    checked={gender=="Female"?true:false}
                    onChange={(event) => setGender(event.target.value)}
                  />
                  <FormControlLabel
                  error={formError.gender}
                  onFocus={()=>handleError('','gender')}
                    value="Male"
                    control={<Radio />}
                    label="Male"
                    checked={gender=="Male"?true:false}
                    onChange={(event) => setGender(event.target.value)}
                  />
                  <FormControlLabel
                   error={formError.gender}
                   onFocus={()=>handleError('','gender')}
                    value="Other"
                    checked={gender=="Other"?true:false}
                    control={<Radio />}
                    label="Other"
                    onChange={(event) => setGender(event.target.value)}
                  />
                </RadioGroup>
                {formError.gender?<FormHelperText style={{color:'red'}} >{formError.gender}</FormHelperText>:<></>}
              </FormControl>
            </Grid>
  
            <Grid item xs={6}>
              <TextField
               error={formError.dob}
               onFocus={()=>handleError('','dob')}
                onChange={(event) => setDob(event.target.value)}
                value={dob} 
                type='date'
                 label='Date of Birth'
                 helperText={formError.dob} 
                 fullWidth />
            </Grid>
  
  
            <Grid item xs={6}>
              <TextField
              error={formError.address}
              onFocus={()=>handleError('','address')}
                onChange={(event) => setAddress(event.target.value)}
                label="Address"
                value={address}
                helperText={formError.address} 
                fullWidth />
            </Grid>
  
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select 
                error={formError.stateid}
                onFocus={()=>handleError('','stateid')}
                onChange={handleStateChange}
                label="State"
                value={stateid}
                >
                <MenuItem>-Select-State</MenuItem>
                  {fillStates()}
                </Select>
                {formError.stateid?<FormHelperText style={{color:'red'}} >{formError.stateid}</FormHelperText>:<></>}
              </FormControl>
            </Grid>
            
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <Select 
                  error={formError.cityid}
                  onFocus={()=>handleError('','cityid')}
                  label="City"
                  value={cityid}
                  onChange={(event) => setCityId(event.target.value)}>
                  <MenuItem>-Select-City</MenuItem>
                  {fillCity()}
                </Select>
                {formError.cityid?<FormHelperText style={{color:'red'}} >{formError.cityid}</FormHelperText>:<></>}
              </FormControl>
           </Grid>
  
            <Grid item xs={6}>
              <TextField
              error={formError.qualification}
              onFocus={()=>handleError('','qualification')}
                onChange={(event) => setQualificationId(event.target.value)} 
                label="Qulification" 
                value={qualification}
                helperText={formError.qualification}
                fullWidth />
            </Grid>
  
            <Grid item xs={3}>
              <TextField
                error={formError.emailid}
                onFocus={()=>handleError('','emailid')}
                onChange={(event) => setEmailId(event.target.value)} 
                label="Email ID"
                value={emailid} 
                helperText={formError.emailid}
                fullWidth />
            </Grid>
  
            <Grid item xs={3}>
              <TextField
              error={formError.mobileno}
              onFocus={()=>handleError('','mobileno')}
                onChange={(event) => setMobileno(event.target.value)} 
                label="Mobail Number" 
                value={mobileno}
                helperText={formError.mobileno}
                fullWidth />
            </Grid>
  
  
            
          </Grid>
  
  
        </div>
  
  
      </div>
  
    )
    
  }

  const showDoctorDetails=()=>{
   return (
      <div>
       
        <Dialog
          open={open}
         
          keepMounted
          onClose={handleClose}
          maxWidth={'md'}
        >
        
          <DialogContent>
            <DialogContentText >
              {showDoctor()}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit}
            >Edit Data</Button>
            <Button onClick={handleClose}
            >Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  function showDoctorList() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Heading icon={doctorimage}
        color="#05BFDB"
         text="Doctor Register"  
         linkimage={adddoctor}
         link={'/admindashboard/doctorsinterface'}
          />
           
        </Grid>
        <Grid item xs={12}>
      <MaterialTable
        title={''}
        columns={[
          { title: 'Doctor', render:(rowData)=><div><div>{rowData.id}/{rowData.doctorname}</div><div>{rowData.gender}</div></div>},
          { title: 'Specialization',  render:(rowData)=><div><div>{rowData.category.categoryname}</div></div> },
          { title: 'Birth', field: 'dob' },
          { title: 'Qualification', field: 'qualification' },
          { title: 'Address', render:(rowData)=><div><div>{rowData.address}</div><div>{rowData.city.cityname},{rowData.states.statename}</div></div>  },
          { title: 'Photograph', render:(rowData)=><div><Avatar src={`${imageURL}${rowData.photograph}`}  style={{width:65,height:65}} /></div> },



        ]}
        data={doctorlist}
        pagesize={3}
        options={{
        paging:true,
        pageSize:3,
        emptyRowsWhenPaging:false,
        pageSizeOptions:[3,5,10]}}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit User',
            onClick: (event, rowData) => handleEdit(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => handleDelete(rowData)
          }
        ]}
      />
      </Grid>
      </Grid>
    )
  }




  return (<div className={classes.container}>
    <div className={classes.box}>
      {showDoctorList()}
    </div>
    {showDoctorDetails()}
  </div>)
}