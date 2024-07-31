import { Grid, TextField, Button, FormControl, Input, InputLabel, OutlinedInput, FormHelperText } from "@mui/material";
import { postData } from "../services/FetchDjangoServices";
import makeStyles from '@mui/styles/makeStyles';
import Heading from "../component/Heading";
import { MouseEvent, HTMLButtonElement } from "react";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import patient from "../assets/patient.png";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'

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


export default function Userregistration(props) {
  const [userName, setUserName] = useState('')
  const [userCity, setUserCity] = useState('')
  const [userDob, setUserDob] = useState("")
  const [userNum, setUserNum] = useState('')
  const [userEmailid, setUserEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [formError, setFormError] = useState({})
  const [showPassword, setShowPassword] = React.useState(false);



  const handleReset = () => {
    setUserName('')
    setUserCity('')
    setUserDob('1/1/1')
    setUserNum('')
    setUserEmailId('')
    setShowPassword('')
    setConfirmPassword('')

  }


  const handleError = (error, label) => {
    setFormError((prev) => ({ ...prev, [label]: error }))

  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const isError = () => {
    var error = false
    if (userName.length == 0) {
      handleError("Please Enter UserName", 'userName')
      error = true
    }
    if (userCity.length == 0) {
      handleError("Please Enter UserCity", 'userCity')
      error = true
    }
    if (userDob.length == 0) {
      handleError("Please Enter UserDob", 'userDob')
      error = true
    }
    if (userNum.length == 0 || !(/^[0-9]{10}$/).test(userNum)) {
      handleError("Please Enter UserNum", 'userNum')
      error = true
    }
    if (userEmailid.length == 0 || !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(userEmailid)) {
      handleError("Please Enter UserEmailId", 'userEmailid')
      error = true
    }
    if (password.length == 0) {
      handleError("Please Enter UserPassword", 'password')
      error = true
    }
    if (confirmpassword) {
      if (password !== confirmpassword) {
        handleError("Your Password doesn't match", 'confirmpassword')
        error = true
      }
    }
    
    return error
  }


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlesubmit = async () => {

    if (!isError()) {
      var body = {
        username: userName, usercity: userCity, userdob: userDob, usernum: userNum,
        useremailid: userEmailid, userpassword: password
      }
      var result = await postData("usersubmit", body);
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





  var classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Heading icon={patient} text="Patient Register" color="#05BFDB" />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth
              label="User Name"
              onChange={(event) => setUserName(event.target.value)}
              value={userName}
              error={formError.userName}
              onFocus={() => handleError('', 'userName')}
              helperText={formError.userName}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="User City"
              onChange={(event) => setUserCity(event.target.value)}
              value={userCity}
              error={formError.userCity}
              onFocus={() => handleError('', 'userCity')}
              helperText={formError.userCity}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="User Dob"
              type='date'
              onChange={(event) => setUserDob(event.target.value)}
              value={userDob}
              error={formError.userDob ? true : false}
              onFocus={() => handleError('', 'userDob')}
              helperText={formError.userDob}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="User Mob.Number"
              onChange={(event) => setUserNum(event.target.value)}
              value={userNum}
              error={formError.userNum}
              onFocus={() => handleError('', 'userNum')}
              helperText={formError.userNum}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="User EmailId"
              onChange={(event) => setUserEmailId(event.target.value)}
              value={userEmailid}
              error={formError.userEmailid}
              onFocus={() => handleError('', 'userEmailid')}
              helperText={formError.userEmailid}
            />
          </Grid>
         
          <Grid item xs={6}>
          <TextField
             
              value={password}
              error={formError.password}
              onFocus={() => handleError("", "password")}
              onChange={handlePasswordChange}
              label="Password"
              type={showPassword ? "text" : "password"}
              helperText={formError.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
          </Grid>
          
          <Grid item xs={6}>
            <Button onClick={handlesubmit} variant="contained">Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleReset} variant="contained">Reset</Button>
          </Grid>

        </Grid>
      </div>
    </div>
  )
}

