import { Grid, FormControl, Select, MenuItem, TextField, Button, InputLabel, Alert, FormHelperText } from "@mui/material";
import { serverURL, getData, postData } from "../services/FetchDjangoServices";
import makeStyles from '@mui/styles/makeStyles';
import Heading from "../component/Heading";
import { useState, useEffect } from "react";
import { HandymanOutlined } from "@mui/icons-material";
import subque from "../assets/subque.png";
import Swal from "sweetalert2"

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '110%',
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


export default function QuestionQueryInterface(props) {
  var doctor=JSON.parse(localStorage.getItem('DOCTOR'))
  const [category, setCategory] = useState([])
  const [question, setQuestion] = useState([])
  const [formError, setFormError] = useState('')

  // -------------------subquestion submit---------------
  const [categoryId, setCategoryId] = useState('')
  const [questionId, setQuestionId] = useState([])
  const [subquestion, setSubquestion] = useState(0)
  const [doctorid, setDoctorId] = useState(doctor.id)
  const [options, setOptions] = useState({});
  const [questionText,setQuestionText]=useState('')

  const handleReset = () => {
    setCategoryId('')
    setDoctorId('')
    setQuestion('')
    setSubquestion('')
    setQuestionText('')
  }

  const handleTextChange = (event, index) => {
    // setOptions((prev)=>({...prev,[index+1]:event.target.value}))
    setOptions({ ...options, [index + 1]: event.target.value })
    console.log(options)
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
    if (question.length == 0) {
      handleError('Please Select Question', 'question')
      error = true
    }
    if (subquestion.length == 0) {
      handleError('Please Select SubQuestion', 'subquestion')
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

  const fetchAllQuestions = async (cid) => {

    var body = { id: cid }
    var data = await postData('questionlist', body)
    setQuestion(data)
  }

  const fillQuestions = () => {
    return question.map((item) => {
      return <MenuItem value={item.id}>{item.question}</MenuItem>;
    })
  }


  const handleCategoryChange = (event) => {
    fetchAllQuestions(event.target.value);
    setCategoryId(event.target.value)
  };



  useEffect(function () {
    fecthAllCategory()
  }, [])



  const Showsuboption = () => {
    var x = new Array(10)
    x.fill(0)
    return x.map((item, index) => {
      return <MenuItem value={index + 1}>{index + 1}</MenuItem>
    })
  }


  const createOption = () => {
    var x = new Array(subquestion)
    x.fill(1)
    return x.map((item, index) => {
      return <TextField
        onChange={(event) => handleTextChange(event, index)}
        label={"subQuestion" + (index + 1)} style={{ margin: 5 }} />
    })
  }


  const handleSubmit = async () => {
    var body = { category: categoryId, 
                 doctor: doctorid,
                 subquestiontext:questionText, 
                 question: questionId, 
                 subquestionnumber: subquestion, 
                 subquestion: Object.values(options)+"" 
                }
    console.log(body)
    var result = await postData("subquestionsubmit", body);
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


  var classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Heading icon={subque} text="Question&Subquestion" color="#05BFDB" />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Specailiztion</InputLabel>
              <Select
                error={formError.category}
                onFocus={() => handleError('', 'category')}
                // value={categoryId}
                label="Specailization"
                onChange={handleCategoryChange}>
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

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Question:</InputLabel>
              <Select
                label="Question"
                // value={(questionId)}
                onChange={(event) => setQuestionId(event.target.value)}
                error={formError.question}
                onFocus={() => handleError("", "question")}
              >
                <MenuItem>Select Question</MenuItem>
                {fillQuestions()}
              </Select>
              {formError.question ? <FormHelperText style={{ color: 'red' }} >{formError.question}</FormHelperText> : <></>}
            </FormControl>
          </Grid>
           
          <Grid item xs={12} >
          <TextField   label="Sub Question" onChange={(event)=>setQuestionText(event.target.value)} fullWidth/>
          </Grid> 
         

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Number of Options</InputLabel>
              <Select
                onChange={(event) => setSubquestion(event.target.value)}
                value={subquestion}
                label="SubQuestion"
                error={formError.subquestion}
                onFocus={() => handleError('', "subquestion")}>
                <MenuItem >no. of SubQuestion</MenuItem>
                {Showsuboption()}
              </Select>
              {formError.subquestion ? <FormHelperText style={{ color: 'red' }} >{formError.subquestion}</FormHelperText> : <></>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {createOption()}
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