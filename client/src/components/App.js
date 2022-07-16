import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/dropdown.js';
import Login from './Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home"
import Logout from "./Logout"
import WorkspaceList from './WorkspaceList';
import BoardList from './BoardList';
import Dropdown from 'react-bootstrap/Dropdown';

function App() {
  let user = undefined;
  if(user) {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Profile
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Link to="/home">
                          username here
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/workspaces">
                          Workspaces
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/boards">
                          Boards
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/logout">
                          Logout
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/home" >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workspaces">
                    Workspaces
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/workspaces" element={<WorkspaceList />} />
            <Route path="/boards" element={<BoardList />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    )
  }

  return (
    <Login />
  )
}

export default App;