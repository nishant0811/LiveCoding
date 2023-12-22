import {BrowserRouter as Router , Routes , Route } from 'react-router-dom';

import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import CreateClass from "./components/CreateClass"
import NotFound from "./components/NotFound"
import ClassDetails from "./components/ClassDetails"
import AddStudent from "./components/AddStudent"
import CodeEditor from "./components/CodeEditor"
import CodeEditorProf from "./components/CodeEditorProf"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/Login" element = {<Login />} />
        <Route path="/Register" element = {<Register />} />
        <Route path="/Dashboard" element = {<Dashboard/>} />
        <Route path="/createClass" element = {<CreateClass/>} />
        <Route path="/details/:id" element = {<ClassDetails />} />
        <Route path="/details/:id/add" element = {<AddStudent />} />
        <Route path="/details/CodeEditor/:clsid" element = {<CodeEditor/>} />
        <Route path="/details/CodeEditor/:clsid/:studid" element = {<CodeEditorProf/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
