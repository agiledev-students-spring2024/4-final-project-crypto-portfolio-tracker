import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Forgot from './Forgot'
import Home from './Home'
import './styles.css';

const App = props => {
  return (
    < div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/forgot_password" element={<Forgot />}/>

        </Routes>
      </Router>
    </div>
  );
}


export default App;
