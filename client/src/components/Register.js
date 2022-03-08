
import React from 'react'
import {useState} from 'react';
import axios from 'axios'
import  { useNavigate } from 'react-router-dom'

import "./css/Registration.css"

const Register = () => {
  const history = useNavigate();
  const [name , setName ] = useState("");
  const [username , setUsername ] = useState("");
  const [password , setPassword] = useState("");
  const [cpass , setCPass] = useState("");
  const [email , setEmail] = useState("");
  const [type , setType] = useState("p");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Lost");
  const [disabled , setDis] = useState(false)
  const [buton , setButton] = useState('Register')
  const updateName = (event)=>{
    setName(event.target.value)
  }

  const updateUserName = (event)=>{
    setUsername(event.target.value)
  }

  const updatePassword = (event)=>{
    setPassword(event.target.value)
  }

  const updateCpass = (event)=>{
    setCPass(event.target.value)
  }

  const updateEmail = (event)=>{
    setEmail(event.target.value)
  }

  const updateType = (event)=>{
    setType(event.target.value)
  }

  const handleSubmit = async (event)=>{
    setDis(true)
    setButton('Registering')
    event.preventDefault();
    const data ={
      name,
      username,
      password,
      cpass,
      email,
      type
    }

    let response = await axios.post("http://localhost:5000/register" , data);
    response = response.data;
    if(!response.valid){
      setError(!response.valid);
      setErrorMsg(response.message);
      setDis(false)
      setButton('Register')
      return;
    }
    setDis(false)
    setButton('Register');

    history("/login")



  }
  return (
    <div className="register__container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
          {
            (error)
            ?
            <p>Error : {errorMsg}</p>
            :
            <p></p>
          }
        <select  name="type" onChange={updateType}>
          <option value="p">Professor</option>
          <option value="s">Student</option>
        </select>
        <input type="text" name="name" value={name} placeholder="Name" onChange={updateName}/>
        <input type="text" name="username" value={username} placeholder="Username" onChange={updateUserName} />
        <input type="password" name="password" value={password} placeholder="Password" onChange={updatePassword} />
        <input type="password" name="cpassword" value={cpass} placeholder="Confirm password" onChange={updateCpass} />
        <input type="text" name="email" value={email} placeholder="Email" onChange={updateEmail} />
        <button type="submit" name="button" disabled={disabled} >{buton}</button>
      </form>

    </div>
  )
}

export default Register
