import React from 'react'
import PropTypes from 'prop-types'
import {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Dashboard = (props) => {
  const history = useNavigate();
  const [name , setName] = useState();

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

      if(!data.valid){
        history("/login")
        return;
      }
      localStorage.setItem("token" , data.token);
      setName(data.name);

    }
    actualWork();
    return () => controller.abort();
  },[])
  return (
      <div className = "dashboard">
      <div className="Navigation">
        <a href="#" onClick={handleLogout}>Log Out</a>
      </div>
      <h2>Welcome , {name}</h2>
      </div>
  )
}

export default Dashboard
