import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles.css';

/**TODO:
 * get hamburger icon, iconfify everything, make this actually look good then we chillin
 */
const Header = props => {
    return (
      <header className="Header-header">
        <nav className="Header-navbar w-full">
          <ul className="nav-links" >
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/settings">Settings</Link>
            </li>
              <li className="nav-item">
                <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }

export default Header