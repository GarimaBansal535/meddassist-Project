import { useEffect, useState } from "react";
import {
  FormHelperText,
  Avatar,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid, FormControl,
  FormLabel, InputLabel, Select, MenuItem, TextField
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Heading from "../component/Heading";
import Swal from "sweetalert2"
import doctorimage from "../assets/doctor.png"
import { serverURL, getData, postData } from "../services/FetchDjangoServices";
import  listdoctor from "../assets/listdoctor.png"
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    background: '#f2f2f2',
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center'

  },
  box: {
    width: 800,
    height: '90%',
    background: '#ffff',
    borderRadius: 10,
    padding: 15,
    marginLeft:'8%',
    marginTop:'2%'
  }
}));


export default function DoctorInterface(props) {
  const [states, setStates] = useState([])
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
  const [formError, setFormError] = useState({})
  const handleReset = () => {
    setAddress('')
    setDoctorName('')
    setGender('')
    setPassword('')
    setMobileno('')
    setEmailId('')
    setCategoryId('')
    setQualificationId('')
    setStateId('')
    setCityId('')
    setDob("1/1/1")
    setPhotograph({ url: "", bytes: "" })
  }


  const handleError = (error, label) => {
    setFormError((prev) => ({ ...prev, [label]: error }))
    console.log("Error", formError)

  }

  const isError = () => {
    var error = false
    if (categoryId.length == 0) {
      handleError('Please Select Category Id', 'categoryid')
      error = true
    }
    if (doctorName.length == 0) {
      handleError('Doctor Name Should Not Be Blank', 'doctorname')
      error = true
    }
    if (gender.length == 0) {
      handleError('Gender Should Not Be Blank', 'gender')
      error = true
    }
    if (dob.length == 0) {
      handleError('Pls input DOB', 'dob')
      error = true
    }
    if (address.length == 0) {
      handleError('Pls Input Address', 'address')
      error = true
    }
    if (stateid.length == 0) {
      handleError('Select State..', 'stateid')
      error = true
    }
    if (cityid.length == 0) {
      handleError('Select City', 'cityid')
      error = true
    }
    if (emailid.length == 0 || !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(emailid)) {
      handleError('Please Input Email Id', 'emailid')
      error = true
    }
    if (mobileno.length == 0 || !(/^[0-9]{10}$/).test(mobileno)) {
      handleError('Pls Input Correct Mobile Number', 'mobileno')
      error = true
    }
    if (qualification.length == 0) {
      handleError('Pls Input Qualification', 'qualification')
      error = true
    }
    if (photograph.bytes.length == 0) {
      handleError('Pls Upload Picture', 'photograph')
      error = true
    }

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
    var data = await postData('citylist', body)
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
    setPhotograph({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
  }

  const handleSubmit = async () => {
    if (!isError()) {
      var formData = new FormData()
      formData.append('category', categoryId);
      formData.append('doctorname', doctorName);
      formData.append('gender', gender);
      formData.append('dob', dob);
      formData.append('address', address);
      formData.append('states', stateid);
      formData.append('city', cityid);
      formData.append('qualification', qualification);
      formData.append('emailid', emailid);
      formData.append('mobileno', mobileno);
      formData.append('photograph', photograph.bytes);
      formData.append('password', `${doctorName}##`);


      var result = await postData("doctorsubmit", formData);
      if (result.status) {
        Swal.fire({
          icon: 'success',
          title: result.message,
          showConfirmButton: false,
          timer: 5000
        })
      }
      else {
        Swal.fire({

          icon: 'error',
          title: result.message,
          showConfirmButton: false,
          timer: 5000
        })
      }
    }
  };

  var classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Heading icon={doctorimage}
            color="#05BFDB"
             text="Doctor Register"  
             linkimage={listdoctor}
             link={'/admindashboard/displayAllDoctor'}
              />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                error={formError.categoryid}
                onFocus={() => handleError('', 'categoryid')}
                label="Category"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
              >
                <MenuItem>Category</MenuItem>
                {fillCategory()}
              </Select>
              {formError.categoryid ? <FormHelperText style={{ color: 'red' }} >{formError.categoryid}</FormHelperText> : <></>}
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <TextField
              error={formError.doctorname}
              onFocus={() => handleError('', 'doctorname')}
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
                  onFocus={() => handleError('', 'gender')}
                  value="female"
                  control={<Radio />}
                  label="Female"
                  onChange={(event) => setGender(event.target.value)}
                />
                <FormControlLabel
                  error={formError.gender}
                  onFocus={() => handleError('', 'gender')}
                  value="male"
                  control={<Radio />}
                  label="Male"
                  onChange={(event) => setGender(event.target.value)}
                />
                <FormControlLabel
                  error={formError.gender}
                  onFocus={() => handleError('', 'gender')}
                  value="other"
                  control={<Radio />}
                  label="Other"
                  onChange={(event) => setGender(event.target.value)}
                />
              </RadioGroup>
              {formError.gender ? <FormHelperText style={{ color: 'red' }} >{formError.gender}</FormHelperText> : <></>}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              error={formError.dob}
              onFocus={() => handleError('', 'dob')}
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
              onFocus={() => handleError('', 'address')}
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
                onFocus={() => handleError('', 'stateid')}
                onChange={handleStateChange} label="State">
                <MenuItem>-Select-State</MenuItem>
                {fillStates()}
              </Select>
              {formError.stateid ? <FormHelperText style={{ color: 'red' }} >{formError.stateid}</FormHelperText> : <></>}
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                error={formError.cityid}
                onFocus={() => handleError('', 'cityid')}
                label="City"
                onChange={(event) => setCityId(event.target.value)}>
                <MenuItem>-Select-City</MenuItem>
                {fillCity()}
              </Select>
              {formError.cityid ? <FormHelperText style={{ color: 'red' }} >{formError.cityid}</FormHelperText> : <></>}
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              error={formError.qualification}
              onFocus={() => handleError('', 'qualification')}
              onChange={(event) => setQualificationId(event.target.value)}
              label="Qulification"
              value={qualification}
              helperText={formError.qualification}
              fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField
              error={formError.emailid}
              onFocus={() => handleError('', 'emailid')}
              onChange={(event) => setEmailId(event.target.value)}
              label="Email ID"
              value={emailid}
              helperText={formError.emailid}
              fullWidth />
          </Grid>

          <Grid item xs={3}>
            <TextField
              error={formError.mobileno}
              onFocus={() => handleError('', 'mobileno')}
              onChange={(event) => setMobileno(event.target.value)}
              label="Mobile Number"
              value={mobileno}
              helperText={formError.mobileno}
              fullWidth />
          </Grid>

          <Grid item xs={6}>
            <Button fullWidth variant="contained" component='label'>
              Upload Doctor Image
              <input
                error={formError.photograph}
                onFocus={() => handleError('', 'photograph')}

                onChange={handlePhotograph}
                type="file"
                hidden
                accept="image/*"
                multipule />
            </Button>
            {formError.photograph ? <FormHelperText style={{ color: 'red' }} >{formError.photograph}</FormHelperText> : <></>}
          </Grid>


          <Grid item xs={6} style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
            <Avatar
              alt="Doctor Image"
              src={photograph.url}
              variant="rounded"
              sx={{ width: 56, height: 56 }}
            />
          </Grid>

          <Grid item xs={6}>
            <Button onClick={handleSubmit} fullWidth variant="contained">   Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={() => handleReset()} fullWidth variant="contained"> Reset</Button>
          </Grid>




        </Grid>


      </div>


    </div>

  )
}