import axios from 'axios'

const validateData = async(token)=>{
  console.log("Sending call");
  let valid = await axios.post("http://localhost:5000/loggedin" , { token : token });
  valid = valid.data
    if(!valid.valid){
      return valid;
    }

    return valid;
}

export default validateData;
