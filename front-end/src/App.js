import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Forgot from './Forgot'
import Settings from './Settings'
import About from './About'
import Home from './Home'
import Portfolio from './Portfolio'
import CryptoList from './CryptoList'
import News from './News'
import './styles.css'

const App = (props) => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
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
