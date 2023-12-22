import React , {useState , useEffect , useRef} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import io from 'socket.io-client'
import {useParams} from 'react-router-dom';


import "./css/CodeEditor.css"

const CodeEditorProf = (props) => {

  let {clsid , studid} = useParams();
  const editor = useRef(null);

  const [code, setNewCode] = useState('');
  const [buttonState , updateButtonState] = useState(false);
  const [buttonValue , setButtonValue] = useState('Submit Code');
  const [output , setOutput] = useState('');

  const handleSubmit = async ()=>{
      updateButtonState(true);
      setButtonValue('Submitted');
      let token = localStorage.getItem("token");
      let data = {
        code : document.getElementsByClassName('editorr')[0].value
      }



      let response = await axios.post("http://localhost:5000/submitCode" , data , {
      withCredentials: true
    });


    response = response.data;
    setOutput(response.output.output)
    localStorage.setItem("token" , response.token)
    updateButtonState(false);
    setButtonValue('Submit Code');

    return response;
  }



  let flag = 0;

  const updateCode = (e)=>{
    setNewCode(e.target.value);
  }


  useEffect(()=>{
    const socket = io('http://localhost:5000/',{
      transports : ['websocket'],
    })

    const allWork = async()=>{
      const data = {
        clsid : clsid,
        userId : studid
      }

      socket.on('connect', ()=>{
        socket.emit('connection' , (data))
      })

      socket.on('room_connection' , (data)=>{
        console.log(data);
      })

      document.getElementsByClassName('editorr')[0].addEventListener('input',()=> {
        data.code = document.getElementsByClassName('editorr')[0].value
        setNewCode(data.code)
        socket.emit('updateCode' , (data))
      })

      socket.on('updateCode' , (data)=>{
        document.getElementsByClassName('editorr')[0].value= data
      })

      document.getElementsByClassName('submitButton')[0].addEventListener('click',async()=> {
        let respo = await handleSubmit();
        data.output = respo.output.output
        socket.emit('updateOutput' , (data))
      })

      socket.on('updateOutput' , (data)=>{
        setOutput(data);
      })
    }

    allWork();



    return () => socket.disconnect();

  },[])





  return (
    <div className="codeContainer" >
      <div className="editor">
        <h2>
          Editor
        </h2>
        <textarea name="code" className="editorr"  id="editor">
        </textarea>

        <button className="submitButton" disabled={buttonState}>{buttonValue}</button>
      </div>
      <div className="output">
        <p>
          <b>Output</b>
        </p>

        <textarea className="outputt" value={output} disabled>

        </textarea>
      </div>
    </div>
  )
}

export default CodeEditorProf
