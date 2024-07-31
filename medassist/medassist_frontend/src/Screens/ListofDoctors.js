import { IconButton } from "@mui/material";
import { serverURL, getData, postData } from "../services/FetchDjangoServices";
import makeStyles from '@mui/styles/makeStyles';
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DoctorCard from "../component/DoctorCard";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: 850,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "auto",
    minHeight: "auto",
    background: "#ffff",
    borderRadius: 10,
    padding: "1%",

    // display:"flex",
    // flexDirection:"row"
  }
}));


export default function ListofDoctors(props) {

  var classes = useStyles()
  const [ddoctor, setDDoctor] = useState({})
  const [doctor, setDoctor] = useState([])
  const [temp, setTemp] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(-1)
  var dispatch = useDispatch()
  var navigate = useNavigate()

  const fecthAllDoctors = async () => {
    var result = await getData('doctorlist')
    setDoctor(result)
    setTemp(result)
  }

  useEffect(function () {
    fecthAllDoctors()

  }, [])

  const searchDoctor = () => {
    if (props.pattern.length != 0) {
      const data = doctor.filter((item) => {
        return item.doctorname.includes(props.pattern)
      })
      setDoctor(data)
    }
    else {
      setDoctor(temp)
    }

  }

  useEffect(function () {
    searchDoctor()

  }, [props])




  const ShowDoctors = () => {
    return doctor.map((item, i) => {
      return <DoctorCard setDDoctor={setDDoctor} data={item} i={i} selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} />
    })
  }
  const handleDoctor = () => {
    if (selectedDoctor == -1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pls Select Doctor...',
        toast: true

      })
    }
    else {
      props.setStatus(false)
      dispatch({ type: 'ADD_DOCTOR', payload: [ddoctor] })
      navigate('/patientdashboard/selecteddoctor')
    }
  }

  return (<div className={classes.container}>
    <div className={classes.box}>

      <div style={{ width: '95%', display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleDoctor} style={{ marginLeft: 'auto', background: "#22a6b3", width: 75, height: 75 }}>
          <ArrowForwardIos style={{ color: '#FFF', fontSize: 36, fontWeight: 'bold' }} />
        </IconButton >
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
        {ShowDoctors()}
      </div>
    </div>
  </div>)


}