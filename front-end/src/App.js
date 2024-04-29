import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Forgot from './pages/Forgot'
import Settings from './pages/Settings'
import About from './pages/About'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import CryptoList from './pages/CryptoList'
import News from './pages/News'
import Profile from './pages/Profile'
import './css/styles.css'

const App = (props) => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot_password" element={<Forgot />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/cryptolist" element={<CryptoList />} />
                    <Route path="/About" element={<About />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
