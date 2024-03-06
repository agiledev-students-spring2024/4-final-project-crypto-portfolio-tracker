import { Link } from 'react-router-dom';
import Hamburger from './Hamburger'
import './styles.css';

/**TODO:
 * get hamburger icon, iconfify everything, make this actually look good then we chillin
 */
const Header = props => {
    return (
      <header className="Header-header w-full p-4">
        <nav className="Header-navbar w-full">
          <ul className="nav-links flex justify-between p-3 hidden md:flex">
            <li className="nav-item">
              <Link to="/" className='px-3 py-2 rounded-md text-sm font-medium'>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className='px-3 py-2 rounded-md text-sm font-medium'>Login</Link>
            </li>
            <li className="nav-item">
            <Link to="/portfolio" className='px-3 py-2 rounded-md text-sm font-medium'>My Portfolio</Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className='px-3 py-2 rounded-md text-sm font-medium'>Settings</Link>
            </li>
              <li className="nav-item">
                <Link to="/about" className='px-3 py-2 rounded-md text-sm font-medium'>About</Link>
            </li>
          </ul>
          <div className='md:hidden text-left size'>
              <Hamburger></Hamburger>
          </div>
        </nav>
      </header>
    )
  }
  
export default Header