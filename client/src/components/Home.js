import {useEffect , useState} from "react"
import {Link} from "react-router-dom"
import axios from 'axios'
import "./css/Home.css"

const Home = ()=>{
  const [logged , setLogged] = useState(false)
  useEffect(()=>{
    let token = localStorage.getItem("token");
    console.log(token);
    const controller = new AbortController();
    const validateData = async()=>{

    let valid = await axios.post("http://localhost:5000/loggedin" , { token : token });
    valid = valid.data;
      if(!valid.valid){
        setLogged(false);
        return;
      }
      setLogged(true);

    }
    validateData();
    return () => controller.abort();
  },[])
  return (
    <div>

      <div className ="Navigation">
      {
        (logged)
        ?
        <Link to="/Dashboard">Dashboard </Link>
        :
        <div>
        <Link to="/login">Login </Link>
        <br />
        <Link to="/Register">Register</Link>
        </div>
      }

      </div>
      <h2>Hello</h2>
    </div>
  )
}


export default Home;
