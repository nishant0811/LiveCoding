import {BrowserRouter as Router , Routes , Route } from 'react-router-dom';

import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import NotFound from "./components/NotFound"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/Login" element = {<Login />} />
        <Route path="/Register" element = {<Register />} />
        <Route path="/Dashboard" element = {<Dashboard/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
