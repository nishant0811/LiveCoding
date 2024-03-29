import React, {useState} from 'react'
import PropTypes from 'prop-types'

import {useNavigate} from 'react-router-dom'

import axios from 'axios'

import "./css/CreateClass.css"

const CreateClass = () => {

  const history = useNavigate();

  const [ className , setClassName] = useState("")

  const handeInputChange = (e)=>{
    setClassName(e.target.value)
  }

  const handleSubmit = async ()=>{
      const payload ={
        clsname : className
      }

      let token = localStorage.getItem("token")

      let response = await axios.post("http://localhost:5000/class/create" , payload ,{
        headers : {
          auth : "Bearer "+token
        },
        withCredentials : true
      })

      response = response.data
      await localStorage.setItem("token" , response.token)

      if(!response.valid){
        alert(response.message);
        return;
      }

      history("/dashboard")
  }


  return (
        <div>
          <div className="createClass heading">
            <h2>
              Create A Classroom
            </h2>
          </div>

          <div className="inputs__classname">
            <input type="text" value={className} name="className" placeholder="Class Name" onChange = {handeInputChange}>
            </input>

            <button onClick = {handleSubmit}>
              Create
            </button>
          </div>
        </div>
  )
}

export default CreateClass
