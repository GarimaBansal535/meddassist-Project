import { useNavigate } from "react-router-dom"


export default function Heading({icon,text,color,linkimage,link})
{
var nevigate=useNavigate()
    return(
        <div style={{display:'flex',padding:5,fontFamily:'Barlow Condensed',fontSize:24,fontWeight:'bold', color:color}}>
        <img src={icon} width='40'/>
        <div style={{marginLeft:5}}>{text}</div>
        <div  onClick={()=>nevigate(link)} style={{marginLeft:'auto'}}><img src={linkimage} style={{width:40}} /></div>
    </div>
    )
}