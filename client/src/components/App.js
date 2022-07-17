import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/dropdown.js';
import Login from './Login'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Nav from "./Nav"
import Home from "./Home"
import Logout from "./Logout"
import WorkspaceList from './WorkspaceList';
import BoardList from './BoardList';
import { useState } from 'react';

function App() {
  const [user, updateUser] = useState();

  const isLoggedIn = () => {  
    if(user) {
      return (
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Nav />} />
            <Route path="/home" element={<Home />} />
            <Route path="/workspaces" element={<WorkspaceList />} />
            <Route path="/boards" element={<BoardList />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      )
    }
    
    if(!user){
      return (
        <div>
          <Routes>
            <Route path="/" element={<Login updateUser={updateUser} />} />
          </Routes>
        </div>
      )
    }
  }

  return (
    <Router>
      <div className="App">
        {isLoggedIn()}
      </div>
    </Router>
  )
}

export default App;