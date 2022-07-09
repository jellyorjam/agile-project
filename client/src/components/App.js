import '../App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Login from './Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home"
// import Profile from "./components/Profile"
import WorkspaceList from './WorkspaceList';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
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
              <li className="nav-item">
                <p className="nav-link">Profile</p>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/workspaces" element={<WorkspaceList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;