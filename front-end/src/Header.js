import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles.css';


const Header = props => {
    return (
      <header className="Header-header">
        <nav className="Header-navbar">
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/messages">Messages</Link>
            </li>
              <li className="nav-item"><Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }

export default Header