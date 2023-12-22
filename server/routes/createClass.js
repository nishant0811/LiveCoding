const express = require('express');
const router = express.Router();

const tokenGenerator = require("../middleware/tokenGenerator");
const userAuth = require("../middleware/userAuth");
const {v4 : uuidv4} = require('uuid')

const Prof = require("../models/profModel")
const Stud = require("../models/studentModel")

router.post("/create" ,tokenGenerator , userAuth ,async (req,res)=>{
    const data = req.data

    if(data.type == 's'){
      res.json({
        valid : false,
        message : "Not Authorized to Create Class",
        token : req.jwtToken
      })

      return;
    }

    try{

    let user = await Prof.findOne({username : data.username});
    let dataa = req.body;
    const clsid = await uuidv4();
    let payload = {
      id : clsid,
      name : req.body.clsname,
      students : []
    }

    user.classRoom.push(payload);
    await Prof.findOneAndUpdate({username : data.username} , {classRoom : user.classRoom});
    res.json({valid : true, message : "Class Added SuccessFully" , token : req.jwtToken})
    }
    catch(e){
      console.log(e.message);
      res.json({valid : false , message : "Internal Server Error" , token : req.jwtToken});
      return;
    }

})

router.get("/details" , tokenGenerator , userAuth , async(req,res)=>{
  const data = req.data
  try{

  if(data.type == "p"){
    let user = await Prof.findOne({username : data.username});
    let classes = user.classRoom;
    res.json({valid : true , data : classes , token : req.jwtToken});

  }
  else {
    let user = await Stud.findOne({username : data.username});
    let classes = user.classRoom;
    res.json({valid : true , data : classes , token : req.jwtToken});
  }
  }
  catch(e){
    console.log(e.message);
    res.json({valid : false , message : "Internal Server Error" , token : req.jwtToken});
  }
})



router.get("/classDetails/:id" , tokenGenerator , userAuth , async(req,res)=>{
  const data = req.data;

  try{
    const classid = req.params.id;
    if(data.type != "p"){
      res.json({valid : false , message : "UnAuthorized User" , token : req.jwtToken});
      return;
    }

    let user = await Prof.findOne({username : data.username});
    let classroom;
    for(let i=0; i<user.classRoom.length;i++){
      let userClsrm = user.classRoom
      if(userClsrm[i].id === classid){
        classroom = userClsrm[i];
        break;
      }
    }

    res.json({valid : true , message : "Okay" , clsrmData : classroom , token : req.jwtToken})
    return;
  }
  catch(e){
    console.log(e.message);
    res.json({valid : false , message : "Internal Server Error" , token : req.jwtToken});
  }
})


router.post("/add" , tokenGenerator , userAuth , async(req,res)=>{
  const data = req.data;
  const bodyData = req.body
  try{
    if(data.type != "p"){
      res.json({valid : false , message : "UnAuthorized User" , token : req.jwtToken});
      return;
    }

    let prof = await Prof.findOne({username : data.username});
    let student = await Stud.findOne({username : bodyData.studName});
    if(!student){
      res.json({valid : false , message : "Student Not Found" , token : req.jwtToken});
      return;
    }
    let classrooms = prof.classRoom;
    let pos=-1;
    let classid = bodyData.clsid
    for(let i=0; i<prof.classRoom.length;i++){
      let userClsrm = prof.classRoom
      if(userClsrm[i].id === classid){
        pos = i;
        break;
      }
    }


    if(pos == -1){
      res.json({valid : false , message : "ClassRoom Not Found" , token : req.jwtToken});
      return;
    }

    let studd ={
      username : student.username,
      id : student.id,
      name : student.name
    }

    let studentClsRm = student.classRoom;
    let studClsRmPayoad ={
      clsid : classid,
      profName : prof.name,
      clsname : classrooms[pos].name
    }

    for(let i =0; i<classrooms[pos].students.length;i++ ){
      let studentt = classrooms[pos].students[i];
      if(studentt.id == student.id){
          res.json({valid : false , message : "Student Already Added" , token : req.jwtToken});
          return;
      }
}


    classrooms[pos].students.push(studd);
    studentClsRm.push(studClsRmPayoad);
    await Prof.findOneAndUpdate({username : data.username} , {classRoom : classrooms})
    await Stud.findOneAndUpdate({username : bodyData.studName} , { classRoom  : studentClsRm})

    res.json({valid : true , message : "Student Added SuccessFully" , token : req.jwtToken});

  }
  catch(e){
    console.log(e.message);
    res.json({valid : false , message : "Internal Server Error" , token : req.jwtToken});
    return;
  }
})


module.exports = router;
