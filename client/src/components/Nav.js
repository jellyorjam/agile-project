import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = () => {
  const login = useSelector(state => state.login);
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  const firstInitial = login.name.first[0];
  const lastInitial = login.name.last[0];
  const pfpStyle = { backgroundColor: "#" + randomColor };

  if(login.login){
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Dropdown>
                  <Dropdown.Toggle className="style-button" id="dropdown-basic">
                    @{login.login.username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu >
                    <Dropdown.Item>
                      <Link to={login._id}>
                          {/* <img className="pfp" src={login.picture} alt={login.name.first} /> */}
                          <div className="row profile-drop">
                            <div className="col-2 pfp-color" style={pfpStyle}>{firstInitial}{lastInitial}</div>
                            <p className="col profile-name">{login.name.first} {login.name.last}</p>
                            <p className="email-nav">@{login.email}</p>
                          </div>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link className="dropdown-text" to="/workspaces">
                        Workspaces
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link className="dropdown-text" to="/boards">
                        Boards
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link className="dropdown-text" to="/logout">
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
    )
  }
}

export default Nav;