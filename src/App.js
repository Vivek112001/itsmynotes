import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './Context/notes/Notestate';
import Alert from './Components/Alert';

function App() {
  return (
    <>
      <NoteState>
       
        <Router>
          <Navbar />
          <Alert/>
          <div className="container">           
            <Routes>
              <Route path="/" element={<Home />}>
              </Route>
              <Route path="/about" element={<About />}>
              </Route>
            </Routes>
        </div>
       
        </Router>
      </NoteState>
    
    </>
  );
}

export default App;
