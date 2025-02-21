import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AllTasks from './components/AllTasks';
import NewTask from './components/NewTask';
import SingleTask from './components/SingleTask';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul className="nav-list">
            <li><Link to="/">All Tasks</Link></li>
            <li><Link to="/create-task">Create Task</Link></li>
            <li><Link to="/task">Single Task</Link></li>
          </ul>
        </nav>

        {/* Routes Configuration */}
        <Routes>
          <Route path="/" element={<AllTasks />} />
          <Route path="/create-task" element={<NewTask />} />
          <Route path="/task" element={<SingleTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
