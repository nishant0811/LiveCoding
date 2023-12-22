import React from 'react'
import PropTypes from 'prop-types'
import {useState , useEffect} from 'react'
import {useNavigate , Link} from 'react-router-dom'
import axios from 'axios'


import "./css/Dashboard.css"

const Dashboard = () => {
  const history = useNavigate();
  const [name , setName] = useState();
  const [classes , setClasses] = useState([]);
  const [studClasses , setStudentClass] = useState([]);
  const [type , setType] = useState('');

  const handleLogout = (event)=>{
    event.preventDefault();
    console.log("Loginng Out");
    localStorage.setItem("token" , "");
    axios.get("http://localhost:5000/logout" , {
      withCredentials : true
    })
    .then((data)=>{
      console.log("Logged Out");
      history("/");
    })
  }

  useEffect(()=>{
    const controller = new AbortController();
    const token = localStorage.getItem("token");
    const actualWork = async()=>{
      let data = await axios.get("http://localhost:5000/getName" , {
        headers : {
          auth : "Bearer "+ token
        },
        withCredentials : true
      })
      data = data.data;
      setType(data.type);
      if(!data.valid){
        history("/login")
        return;
      }
      localStorage.setItem("token" , data.token);
      setName(data.name);

    }

    const getClasses = async()=>{
      let token = localStorage.getItem("token")
      let response = await axios.get("http://localhost:5000/class/details" , {
        headers : {
          auth : "Bearer "+ token
        },
        withCredentials : true
      })

      response = response.data

      await localStorage.setItem("token" , response.token)

      if(!response.valid){
        alert(response.message);
        return
      }

      let data = response.data;
      setClasses(data);


        setStudentClass(data);


    }
    actualWork();
    getClasses();
    return () => controller.abort();
  },[])
  return (
      <div className = "dashboard">
      <div className="Navigation">
        <a href="#" onClick={handleLogout}>Log Out</a>
      </div>
      <h2 class="welcome">Welcome , {name}</h2>

      <div className = "classes__contianer">
        <div className="classes__header">
          <div>
            <h2>
              List Of Class Room
            </h2>
          </div>
          <div class="createClass__btn">
            {
              (type == 'p')
              ?
              <Link to="/createClass">
                Create Class Room
              </Link>
              :
              <div></div>
            }

          </div>
        </div>
        {
          (type == 's')
          ?
          <div className="stud__extra__buttons">
            <div className="action">
              <Link to={""} >
                Submit Assignment
              </Link>
            </div>
            <div className="action">
              <Link to={""} >
                Give Exam
              </Link>
            </div>
            <div className="action">
              <Link to={""} >
                View Announcement
              </Link>
            </div>
            <div className="action">
              <Link to={""} >
                Give A Quiz
              </Link>
            </div>
          </div>
          :
          <>
          </>
        }
        <div className="clsrm__container">
          {
            (type == 'p')
            ?
            classes.map(cls =>{

              return (<div className="clsrm" key={cls.id}>
                <div className="clsrm__name">
                  <p>Class Name : <b>{cls.name}</b></p>
                </div>
                <div>
                  <Link to={"/details/"+cls.id}>View Details</Link>
                </div>
              </div>)
            })

            :
            studClasses.map(cls =>{

              return(
                <div className="clsrm" key={cls.clsid}>
                  <div className="clsrm__name">
                    <p>Class Name : <b>{cls.clsname}</b></p>
                  </div>
                  <div className = "clsrm__name">
                    <p>
                      Faculty Name : <b>{cls.profName}</b>
                    </p>
                  </div>
                  <div>
                    <Link to={"/details/CodeEditor/"+cls.clsid}>Edit Code</Link>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
      </div>
  )
}

export default Dashboard
