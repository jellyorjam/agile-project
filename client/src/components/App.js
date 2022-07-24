import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/dropdown.js';
import '../App.css';
import '../lists.css';
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
import Board from './Board';
import Card from './Card';
import { useSelector } from 'react-redux';
import Profile from './Profile';
import { useState } from 'react';

function App() {
  const userId = useSelector(state => state.login._id)
  const [color, setColor] = useState('');

  const isLoggedIn = () => {  
    if(userId) {
      return (
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Nav />} />
            <Route path="/home" element={<Home />} />
            <Route path="/:workspaceId/boards" element={<BoardList setColor={setColor} />}/>
            <Route path="/:workspaceId/boards/:boardId" element={<Board color={color}/>}>
              <Route path="/:workspaceId/boards/:boardId/cards/:cardId" element={<Card/>}/>
            </Route>
            <Route path="/workspaces" element={<WorkspaceList />} />
            <Route path="/:userId" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      )
    }
    
    if(!userId){
      return (
        <div className="login-background">
          <div className='logo row'>
            <h1 className='col'>{`Trello(ish)`}</h1> 
          </div>
          <Routes>
            <Route path="/" element={<Login />} />
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