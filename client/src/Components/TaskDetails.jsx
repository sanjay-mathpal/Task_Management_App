import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import "../styles/taskdetails.css"
import { useNavigate } from 'react-router-dom';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`https://task-management-app-backend-ten.vercel.app/tasks/${id}`);
        const fetchedTask = response.data;

        setTitle(fetchedTask.title);
        setDesc(fetchedTask.description);
        setStatus(fetchedTask.status);
        setPriority(fetchedTask.priority);
        setDueDate(format(new Date(fetchedTask.dueDate), 'dd-MM-yyyy'));
        setCreatedAt(format(new Date(fetchedTask.createdAt), 'dd-MM-yyyy'));

        setTask(fetchedTask);
      } catch (error) {
        console.error(`Error fetching task with ID ${id}:`, error);
      }
    };

    fetchTask();
  }, [id]);

  const onUpdate = async () => {
    try {
      await axios.put(`https://task-management-app-backend-ten.vercel.app/tasks/${id}`, {
        title,
        description: desc,
        dueDate,
        status,
        priority,
      });
      console.log("Updated successfully!")
      navigate("/")
      // Handle success, e.g., update state or show success message
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error, e.g., show error message
    }
  };


  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-details-form">
      <h1 style={{ display: "flex", justifyContent: "center" }}>Task Details</h1>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date:</label>
        <input
          id="dueDate"
          type="text"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="createdAt">Created At:</label>
        <input
          id="createdAt"
          type="text"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="action-buttons">
        <button onClick={onUpdate}>Update</button>
      </div>
    </div>
  );
};

export default TaskDetails;
