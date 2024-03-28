import { Link } from 'react-router-dom'
import Hamburger from './Hamburger'
import './styles.css'

/**TODO:
 * get hamburger icon, iconfify everything, make this actually look good then we chillin
 */
const Header = (props) => {
    return (
        <header className="Header-header w-full p-4">
            <nav className="Header-navbar w-full">
                <ul className="nav-links flex hidden justify-between p-3 md:flex">
                    <li className="nav-item">
                        <Link
                            to="/"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/login"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/portfolio"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            My Portfolio
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/cryptolist"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            Cryptocurrencies
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/settings"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            Settings
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/news"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            News
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/about"
                            className="rounded-md px-3 py-2 text-sm font-medium"
                        >
                            About
                        </Link>
                    </li>
                </ul>
                <div
                    className="p-2 text-left md:hidden"
                    style={{ maxWidth: '50px' }}
                >
                    <Hamburger></Hamburger>
                </div>
            </nav>
        </header>
    )
}

export default Header
