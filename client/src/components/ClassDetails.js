import React , {useEffect , useState} from 'react'
import PropTypes from 'prop-types'
import {useParams , Link , useNavigate} from 'react-router-dom'
import axios from 'axios'

import "./css/ClassDetails.css"

const ClassDetails = (props) => {
  let { id } = useParams();
  const [ className , setClassName] = useState("");
  const [students , setStudents] = useState([]);
  const [modal , setModalState] = useState(false)
  const history = useNavigate();


  const onAdd = ()=>{

    setModalState(true);
  }

  useEffect(()=>{
    const controller = new AbortController();
    let token = localStorage.getItem("token");
    const getDetails = async()=>{
      let response = await axios.get("http://localhost:5000/class/classDetails/"+id , {
        headers : {
          auth : "Bearer "+token
        },
        withCredentials : true
      })
      response = response.data;

      localStorage.setItem("token" , response.token)
      if(!response.valid){
        if(response.message == "Internal Server Error"){
          alert(response.message);
          return;
        }
        else{
          history("/dashboard");
          return;
        }
      }
      let clssrm = response.clsrmData;

      setClassName(clssrm.name);
      setStudents(clssrm.students );

      return;
    }


    getDetails();
    return () => controller.abort();
  },[])


  return (

    <div className="classDetials__container">
      <div className="Navigation">
          <Link to="/dashboard">
            Dashboard
          </Link>
          <Link to="/dashboard">
            Add Assigment
          </Link>
          <Link to="/dashboard">
            Schedule a Test
          </Link>
          <Link to="/dashboard">
            Evaluate Code
          </Link>
      </div>
    <div className="clsDet__header">
      <div className="clsname">
          <h2>
            {className}
          </h2>
      </div>
      <div className="cls_stdnt_add">
          <Link to={"/details/"+id+"/add"} onClick={onAdd}>
            Add Student
          </Link>
          <Link to={""} onClick={onAdd}>
            Remove Student
          </Link>
      </div>

      </div>

      <div className="student__list">
        <div className="student__container">
            {
            students.map((student)=>{
              return   (<div className="studnt" key = {student.id}>
                <div className="student__name" >
                  <p>{student.name}</p>
                </div>
                <div className="student__code">
                  <Link to={"/details/CodeEditor/"+id+"/"+student.id}>
                    View Code
                  </Link>
                </div>
              </div>)
            })
        }

        </div>
      </div>
    </div>
  )
}

export default ClassDetails
