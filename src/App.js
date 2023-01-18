import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from "./pages/home/Home"
import { Login } from "./pages/Login";
import { CreatePost } from "./pages/create-post/create-post";
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1 className="display-1 text-danger">Error 404! Page not Found!</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
