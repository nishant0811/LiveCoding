import {useState , useEffect } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

import "./css/Login.css"
const Login = () => {
  const history = useNavigate();
  const [username , setUsername ] = useState("");
  const [password , setPassword] = useState("");
  const [disabled , setDisabled] = useState(false);
  const [error , setError] = useState(false);
  const [errorMsg , setErrorMsg]= useState("");
  const [button , setButton] = useState("Login")

  const updateUserName = (event)=>{
    setUsername(event.target.value)
  }

  const updatePass = (event)=>{
    setPassword(event.target.value)
  }
  const handleSubmit = async(event)=>{
    event.preventDefault();
    setDisabled(true);
    setButton("Loggin In...")
    const data ={
      username,
      password
    }

    let response = await axios.post("http://localhost:5000/login" , data , {
    withCredentials: true
  });
    response = response.data;
    console.log(response);
    if(!response.valid){
      setError(!response.valid);
      setErrorMsg(response.message);
      setDisabled(false);
      setButton("Login")
      return;
    }

    localStorage.setItem("token" , response.token);
    history("/dashboard")
    setDisabled(false);
    setButton("Login");


  }


useEffect( ()=>{
  let token = localStorage.getItem("token");
  console.log(token);
  const controller = new AbortController();
  const validateData = async()=>{
    
  let valid = await axios.post("http://localhost:5000/loggedin" , { token : token });
  valid = valid.data;
    if(!valid.valid){
      return;
    }
    history("/dashboard")
  }
  validateData();

  return () => controller.abort();
},[])

  return (
    <div className="login__container">
    <form onSubmit={handleSubmit}>
    <h2>Login</h2>
    {
      (error)?
      <p>Error : {errorMsg}</p>
      :
      <p></p>
    }
      <input type="text" value={username} placeholder="Username " onChange={updateUserName} />
      <input type="password" value={password} placeholder="Password " onChange={updatePass} />
      <button type="Submit" disabled = {disabled}>{button}</button>
    </form>

    </div>
  )
}

export default Login
