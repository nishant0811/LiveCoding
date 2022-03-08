import {useEffect , useState} from "react"
import {Link} from "react-router-dom"
import axios from 'axios'
import "./css/Home.css"

const Home = ()=>{
  const [logged , setLogged] = useState(false)
  useEffect(()=>{
    let token = localStorage.getItem("token");

    const controller = new AbortController();
    const validateData = async()=>{

      let valid = await axios.get("http://localhost:5000/getName" , {
        headers : {
          auth : "Bearer "+ token
        },
        withCredentials : true
      })
    valid = valid.data;
      if(!valid.valid){
        setLogged(false);
        return;
      }
      setLogged(true);
      localStorage.setItem("token" , valid.token);

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
      <div className="home__body">
        <div class="home__heading">
          <h2>Code</h2>
          <h2>Create</h2>
          <h2>Learn</h2>
        </div>
        <div className="home__img">
          <img  src="https://techcrunch.com/wp-content/uploads/2020/07/apple_coding-programs-for-educators-and-students_07092020.jpg"></img>
        </div>
      </div>

      <div className = "footer_Buttons">
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
    </div>
  )
}


export default Home;
