import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = () => {
  const login = useSelector(state => state.login);

  console.log(login)
  if(login.login){
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Dropdown>
                  <Dropdown.Toggle className="style-button" id="dropdown-basic">
                    Profile
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link className="container row profile-nav" to="/home">
                        <img className="pfp col-7" src={login.picture} alt={login.name.first} />
                        <p className="username">{login.login.username}</p>
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