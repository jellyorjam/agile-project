import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const login = useSelector(state => state.login);
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  const pfpStyle = { backgroundColor: "#" + randomColor };

  if(login.login){
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="nav-link" to="/workspaces">
                  Workspaces
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/home" >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Dropdown>
                  <Dropdown.Toggle className="style-button" id="dropdown-basic">
                    @{login.login.username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu >
                    <Dropdown.Item onClick={() => navigate("/" + login._id, {relpace: true})}>
                      {/* <img className="pfp" src={login.picture} alt={login.name.first} /> */}
                      <div className="profile-drop">
                        <div className="row"> 
                          <div className="col-2 pfp-color" style={pfpStyle}>{login.name.first[0]}{login.name.last[0]}</div>
                          <p className="col profile-name">{login.name.first} {login.name.last}</p>
                        </div>
                        <p className="email-nav">View Profile</p>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-text" onClick={() => navigate("/workspaces", {relpace: true})}>
                      Workspaces
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-text" onClick={() => navigate("/boards", {relpace: true})}>
                      Boards
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-text" onClick={() => navigate("/logout", {relpace: true})}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
    )
  }
}

export default Nav;