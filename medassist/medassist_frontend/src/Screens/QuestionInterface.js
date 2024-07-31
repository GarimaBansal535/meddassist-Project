import { Grid, FormControl, Select, MenuItem, TextField, Button, InputLabel, Alert, FormHelperText } from "@mui/material";
import { serverURL, getData, postData } from "../services/FetchDjangoServices";
import makeStyles from '@mui/styles/makeStyles';
import Heading from "../component/Heading";
import { useState, useEffect } from "react";
import { HandymanOutlined } from "@mui/icons-material";
import drquestion from "../assets/drquestion.jpg";
import Swal from "sweetalert2"

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
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


export default function QuestionInterface(props) {
  var doctor=JSON.parse(localStorage.getItem('DOCTOR'))
  const [category, setCategory] = useState([])
  
//-----------------Question Submit------------------------
  const [Question, setQuestion] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [formError, setFormError] = useState('')
  const [doctorid, setDoctorId] = useState(doctor.id)

  const handleReset = () => {
    setCategoryId('')
    setDoctorId('')
    setQuestion('')

  }



  const handleError = (error, label) => {
    setFormError((prev) => ({ ...prev, [label]: error }))
    console.log("Error", formError)
  }


  const isError = () => {
    var error = false
    if (categoryId.length == 0) {
      handleError('Please Select Specailization', 'category')
      error = true
    }
    if (Question.length == 0) {
      handleError('Please Select Question', 'question')
      error = true
    }


    if (doctorid.length == 0) {
      handleError('Please Select Doctor ID', 'doctorid')
      error = true
    }
    return error
  }


  const fecthAllCategory = async () => {
    var data = await getData('categorylist')
    setCategory(data)
  }

  const fillCategory = () => {
    return category.map((item) => {
      return <MenuItem value={item.id}>{item.categoryname}</MenuItem>
    })
  }


  useEffect(function () {
    fecthAllCategory()
  }, [])


  const handleSubmit = async () => {
    if (!isError()) {
      var body = { Category: categoryId, Doctor: doctorid, question: Question }
      var result = await postData("questionsubmit", body);
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
            <Heading icon={drquestion} text="Question" color="#05BFDB" />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Specailiztion</InputLabel>
              <Select
                error={formError.category}
                onFocus={() => handleError('', 'category')}
                value={categoryId}
                label="Specailization"
                onChange={(event) => setCategoryId(event.target.value)}>
                <MenuItem>Specailization</MenuItem>
                {fillCategory()}
              </Select>
              {formError.categoryid ? <FormHelperText style={{ color: 'red' }} >{formError.categoryid}</FormHelperText> : <></>}

            </FormControl>
          </Grid>

          < Grid item xs={6}>
            <TextField fullWidth
              label="Doctor Id"
              onChange={(event) => setDoctorId(event.target.value)}
              value={doctorid}
              error={formError.doctorid}
              onFocus={() => handleError('', 'doctorid')}
              helperText={formError.doctorid}
            />
          </Grid>

          < Grid item xs={12}>
            <TextField fullWidth
              label="Question Type"
              onChange={(event) => setQuestion(event.target.value)}
              value={Question}
              error={formError.question}
              onFocus={() => handleError('', 'question')}
              helperText={formError.question}
            />
          </Grid>


          <Grid item xs={6}>
            <Button variant="contained" fullWidth onClick={() => handleSubmit()}>Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              
              fullWidth
              onClick={() => handleReset()}>Reset</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}