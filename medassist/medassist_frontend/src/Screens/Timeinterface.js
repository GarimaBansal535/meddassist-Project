import { useEffect, useState } from "react"
import React from "react";
import { Grid, TextField, Button, FormControl, Radio, FormLabel,
         FormHelperText} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Heading from "../component/Heading";
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { serverURL, getData, postData } from "../services/FetchDjangoServices";
import Swal from "sweetalert2"
import { LocalizationProvider, MobileTimePicker, TimePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment/moment";



const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    background: '#DBC4F0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  },
  box: {
    width: 800,
    height: 'auto',
    background: '#ffff',
    borderRadius: 10,
    padding: 15
  }
}));




export default function TimeInterface(props) {
  const [doctorid, setDoctorId] = useState('')
  const [starttiming, setStartTiming] = useState('')
  const [endtiming, setEndTiming] = useState('')
  const [days, setDays] = useState([])
  const [status, setStatus] = useState('')
  const [formError, setFormError] = useState({})
  const handleReset=()=>{
    setDoctorId('')
    setStartTiming('')
    setEndTiming('')
    setDays('')
    setStatus('')
  }

  const handleError = (error, label) => {
    setFormError((prev) => ({ ...prev, [label]: error }))

  }

  const isError = () => {
    var error = false
    if (doctorid.length == 0) {
      handleError("Please Enter DoctorId", 'doctorId')
      error = true
    }
    if (starttiming.length == 0) {
      handleError("Please Enter StartTime", 'startTime')
      error = true
    }
    if (endtiming.length == 0) {
      handleError("Please Enter EndTime", 'endTime')
      error = true
    }
    if (status.length == 0) {
      handleError("Please select Status", 'statuss')
      error = true
    }
    if (days.length == 0) {
      handleError("Please select Days", 'dayss')
      error = true
    }
    return error
  }


 

  const handlesubmit = async () => {
    if (!isError()) {
      var body = { doctor: doctorid, starttimings: starttiming, 
        endtimings: endtiming, days: days, status: status }
      var result = await postData("timesubmit", body);
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
  }

  const handleChangeSt = (event) => {
    var time = moment().format("hh:mm A")
    // alert(time)
    setStartTiming(time)
  }

  const handleChangeEt = (event) => {
    var time = moment().format("hh:mm A")
    setEndTiming(time)
  }
  const handleDays = (event) => {
    const { value, checked } = event.target;
     if (checked) {
      setDays([...days, value]);
    } else {
      setDays(days.filter((event) => event !== value));
    }
  };
  

  var classes = useStyles()
  return (<div className={classes.container}>
    <div className={classes.box}>
      <Grid container spacing={3}  >
        <Grid item xs={12}>
          <Heading icon="Doctor.png" color="#05BFDB" text="Time Booking" />
        </Grid>

        <Grid item xs={4}>
          <TextField
            error={formError.doctorId}
            onFocus={() => handleError('', 'doctorId')}
            onChange={(event) => setDoctorId(event.target.value)}
            label="Doctor Id"
            value={doctorid}
            helperText={formError.doctorId} />
        </Grid>


        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['MobileTimePicker']}>
              <DemoItem label="Start Time">
                {/* value={starttiming} */}
                <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} value={starttiming}
                  error={formError.startTime}
                  onFocus={() => handleError('', 'startTime')}
                  onChange={handleChangeSt} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          {formError.startTime ? <FormHelperText style={{ color: 'red' }} >{formError.startTime}</FormHelperText> : <></>}
        </Grid>


        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['MobileTimePicker']}>
              <DemoItem label="End Time">
                {/* value={endtiming} */}
                <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} value={endtiming}
                  error={formError.endTime}
                  onFocus={() => handleError('', 'endTime')}
                  onChange={handleChangeEt} />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          {formError.endTime ? <FormHelperText style={{ color: 'red' }} >{formError.endTime}</FormHelperText> : <></>}
        </Grid>

        <Grid item xs={12}>
        <TextField fullWidth
            error={formError.dayss}
            onFocus={() => handleError('', 'dayss')}
            onChange={(event) => setDays(event.target.value)}
            label="Available Days"
            value={days}
            helperText={formError.dayss}/>
            </Grid>

        <Grid item  xs={12}>
       <FormGroup  row >
       <FormControlLabel          
            onChang={handleDays}
            value="Monday"
            control={<Checkbox checked={days.includes('Monday')} />} 
            label="Monday" />

       <FormControlLabel          
           onChange={handleDays}
            value="Tuesday"
            control={<Checkbox  checked={days.includes('Tuesday')} />} 
            label="Tuesday"   />
       <FormControlLabel          
            onChange={handleDays}
            value="Wednesday"
            control={<Checkbox  checked={days.includes('Wednesday')}/>} 
            label="Wednesday"  />
       <FormControlLabel          
            onChange={handleDays}
            value="Thursday"
            control={<Checkbox checked={days.includes('Thursday')} />} 
            label="Thursday"  />
       <FormControlLabel          
            onChange={handleDays}
            value="Friday"
            control={<Checkbox checked={days.includes('Friday')}/>} 
            label="Friday"   />
       <FormControlLabel          
            onChange={handleDays}
            value="Saturday"
            control={<Checkbox checked={days.includes('Saturday')}/>} 
            label="Saturday"  />
       <FormControlLabel         
            onChange={handleDays}
            value="Sunday"
            control={<Checkbox checked={days.includes(' sunday')} />} 
            label="Sunday"  />
      
    </FormGroup>
   
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <FormControlLabel
              error={formError.statuss}
              onFocus={() => handleError('', 'statuss')}
              value="available"
              control={<Radio />}
              label="available"
              
              onChange={(event) => setStatus(event.target.value)} />

            <FormControlLabel
              error={formError.statuss}
              onFocus={() => handleError('', 'statuss')}
              value="notavailable"
              control={<Radio />}
              label="notavailable"
             
              onChange={(event) => setStatus(event.target.value)} />
            {formError.statuss ? <FormHelperText style={{ color: 'red' }} >{formError.statuss}</FormHelperText> : <></>}
          </FormControl>
        </Grid>



        <Grid item xs={6}>
          <Button onClick={handlesubmit} fullWidth variant="contained">submit</Button>
        </Grid>

        <Grid item xs={6}>
          <Button onClick={()=>handleReset()}  fullWidth variant="contained">Reset</Button>
        </Grid>


      </Grid>


    </div>
  </div>
  )
}
