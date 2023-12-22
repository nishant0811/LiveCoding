import React, {useState} from 'react'
import PropTypes from 'prop-types'

import {useNavigate , useParams} from 'react-router-dom'

import axios from 'axios'

import "./css/CreateClass.css"

const AddStudent = () => {

  let {id} = useParams()

  const history = useNavigate();

  const [ className , setClassName] = useState("")

  const handeInputChange = (e)=>{
    setClassName(e.target.value)
  }

  const handleSubmit = async ()=>{

      if(className.length == 0){
        alert("Enter a Name");
        return;
      }
      const payload ={
        studName: className,
        clsid : id
      }

      let token = localStorage.getItem("token")

      let response = await axios.post("http://localhost:5000/class/add" , payload ,{
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

      history("/details/"+id)
  }


  return (
        <div>
          <div className="createClass heading">
            <h2>
              Add A Student To The Classroom
            </h2>
          </div>

          <div className="inputs__classname">
            <input type="text" value={className} name="StudentName" placeholder="Student Username" onChange = {handeInputChange}>
            </input>

            <button onClick = {handleSubmit}>
              Add Student
            </button>
          </div>
        </div>
  )
}

export default AddStudent
