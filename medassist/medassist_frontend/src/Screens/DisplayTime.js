import { useEffect, useState } from "react";
import { getData, postData, serverURL } from "../services/FetchDjangoServices";
import MaterialTable from "@material-table/core"
import makeStyles from "@mui/styles/makeStyles";
import { Grid, TextField, Button, FormControl, Radio, FormLabel, FormHelperText } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TimeInterface from "./Timeinterface";
import FormControlLabel from '@mui/material/FormControlLabel';
import dayjs from 'dayjs';
import moment from "moment/moment";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import Heading from "../component/Heading";
import { LocalizationProvider, MobileTimePicker, TimePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2"
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

const useStyles = makeStyles((theme) => ({
  container: {
    width: 'auto',
    height: 'auto',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  },
  box: {
    width: 'auto',
    height: 'auto',
    background: '#ffff',
    borderRadius: 10,
    padding: 15
  },
  container: {
    width: '100vw',
    height: '100vh',
    background: '#DBC4F0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  },
  box: {
    width: '1200',
    height: 'auto',
    background: '#ffff',
    borderRadius: 10,
    padding: 15
  }
}));

export default function DisplayTime() {
  var classes = useStyles()
  /*****************Time Interface********/
  const [doctorid, setDoctorId] = useState('')
  const [starttiming, setStartTiming] = useState('')
  const [endtiming, setEndTiming] = useState('')
  const [days, setDays] = useState([])
  const [status, setStatus] = useState('')
  const [formError, setFormError] = useState({})
  const [timeid,setTimeId]=useState('')
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
      var body = { id:timeid,doctor: doctorid, starttimings: starttiming, endtimings: endtiming, days: days, status: status }
      // alert(JSON.stringify(body))
      var result = await postData("timeedit", body);
      if (result.status) {
        Swal.fire({
          icon: 'success',
          title: result.message,
          showConfirmButton: false,
          timer: 1000
        })
        fetchTime()
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
  }

  const handleChangeSt = (event) => {
    var time = moment().format("hh:mm A");
    // alert(time);
    setStartTiming(time);
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
  

  /**************************************/
  const [timelist, setTimelist] = useState([])
  const [open, setOpen] = useState(false)

  const fetchTime = async () => {
    var result = await getData('timelist')
    setTimelist(result)
  }

  useEffect(function () {
    fetchTime()
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleEdit = (rowData) => {
    // alert(JSON.stringify(rowData))
    setTimeId(rowData.id)
    setDoctorId(rowData.doctor.id)
    setStartTiming(rowData.starttimings)
    setEndTiming(rowData.endtimings)
    setDays(rowData.days)
    setStatus(rowData.status)
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
      
      var result=await postData('timedelete',body)
      if(result.status)
      {

      Swal.fire('Deleted!', '', 'success')
      fetchTime()
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




  const showTime = () => {
    return (<div className={classes.rootcontainer}>
      <div className={classes.rootbox}>
        <Grid container spacing={3}  >
          <Grid item xs={12}>
            <Heading text="Time Booking" icon="Doctor.png"  color="#05BFDB" />
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
                <DemoItem label="Start Time"
                  value={starttiming} >
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
                <DemoItem label="End Time"
                  value={endtiming} >
                  <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')}
                    value={endtiming}
                    error={formError.endTime}
                    onFocus={() => handleError('', 'endTime')}
                    onChange={handleChangeEt} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            {formError.endTime ? <FormHelperText style={{ color: 'red' }} >{formError.eTime}</FormHelperText> : <></>}
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
                value="avilable"
                control={<Radio />}
                label="avilable"
                checked={status == "avilable" ? true : false}
                onChange={(event) => setStatus(event.target.value)} />

              <FormControlLabel
                error={formError.statuss}
                onFocus={() => handleError('', 'statuss')}
                value="notavilable"
                control={<Radio />}
                label="notavilable"
                checked={status == "notavilable" ? true : false}
                onChange={(event) => setStatus(event.target.value)} />
              {formError.statuss ? <FormHelperText style={{ color: 'red' }} >{formError.statuss}</FormHelperText> : <></>}
            </FormControl>
          </Grid>

        </Grid>


      </div>
    </div>
    )

  }


  const showTimeDetails = () => {
    return (
      <div>

        <Dialog
          open={open}

          keepMounted
          onClose={handleClose}
          maxWidth={'sm'}
        >

          <DialogContent>
            <DialogContentText >
              {showTime()}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlesubmit}
            >Edit Data</Button>
            <Button onClick={handleClose}
            >Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  function ShowTimeList() {
    return (
      <MaterialTable
        title="Time List"
        columns={[
          { title: 'DoctorName', render: (rowData) => <div><div>{rowData.id}/{rowData.doctor.doctorname}</div><div>{rowData.status}</div><div>{rowData.days}</div></div> },
          { title: 'Starttime', field: 'starttimings' },
          { title: 'Endtime', field: 'endtimings' },

        ]}
        data={timelist}
        pagesize={3}
        options={{
          paging: true,
          pageSize: 3,
          emptyRowsWhenPaging: false,
          pageSizeOptions: [3, 5, 10]
        }}

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
    )
  }



  return (<div className={classes.container}>
    <div className={classes.box}>
      {ShowTimeList()}
    </div>
    {showTimeDetails()}
  </div>)
}