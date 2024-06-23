import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TaskList from './Components/TaskList';
import TaskDetails from './Components/TaskDetails';
import TaskForm from './Components/TaskForm';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/new-task" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
