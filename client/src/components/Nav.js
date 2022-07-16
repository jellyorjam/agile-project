import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
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
  )
}

export default Nav;