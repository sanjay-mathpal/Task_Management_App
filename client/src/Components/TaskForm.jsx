import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/taskform.css"

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  const navigate = useNavigate();

  const onCreate = async () => {
    try {
      await axios.post(`https://task-management-app-two-delta.vercel.app//tasks`, {
        title,
        description: desc,
        dueDate,
        status,
        priority,
      });
      navigate('/');
      console.log("Task created successfully!")
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="task-form-container">
      <h1 style={{display: "flex", justifyContent: "center"}}>Create New Task</h1>
      <div className="task-details-form">
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
          <button onClick={onCreate}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
