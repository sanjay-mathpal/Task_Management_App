import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import "../styles/tasklist.css"
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate();

  const onDelete = async (id) => {
    try {
      await axios.delete(`https://task-management-app-backend-ten.vercel.app/tasks/${id}`);
      console.log('Task deleted successfully');
      // Update the tasks state to remove the deleted task
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://task-management-app-backend-ten.vercel.app/tasks');
        console.log(res.data);
        // Sort tasks by creation date in descending order
        const sortedTasks = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTasks(sortedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchData();
  }, []);

  const handleViewDetails = (taskId) => {
    navigate(`/task/${taskId}`); // Navigate to /tasks/:id
  };

  return (
    <div>
      <h1 className='title'>Task's List</h1>
      <div id='right'>
        <Link to={"/new-task"}><button>+ Create a new task</button></Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>View/Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td className={`task-status ${task.status === 'completed' ? 'completed' : 'pending'}`}>
                {task.status}
              </td>
              <td>{format(new Date(task.dueDate), 'dd-MM-yyyy')}</td>
              <td><button onClick={() => handleViewDetails(task._id)}>View Details / Edit</button><button id='danger' onClick={() => onDelete(task._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskList