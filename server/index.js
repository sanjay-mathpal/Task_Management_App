import express from "express"
import cors from "cors"
import connectDB from "./db/db.js"
import dotenv from "dotenv"
import { Task } from "./models/taskModel.js"
import moment from "moment/moment.js"

dotenv.config()
connectDB();

const app = express();

app.use(cors(
    {
        origin: ["https://task-management-app-frontend-gold.vercel.app"],
        methods: ["GET","POST","PUT","DELETE"],
        credentials: true
    }
));
app.use(express.json())

// CRUD Routes

app.get('/', async (req, res) => {
    res.send("Server is running");
});
// get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});


// create a new task
app.post('/tasks', async (req, res) => {
    try {
        const { title, description, dueDate, status, priority} = req.body;

        const isoDueDate = moment(dueDate, 'DD-MM-YYYY').toISOString();
        // Create new task object
        const task = new Task({
            title,
            description,
            dueDate: new Date(isoDueDate),
            status: status || 'pending', // default to 'pending' if not provided
            priority: priority || 'medium', // default to 'medium' if not provided
        });

        // Save task to database
        await task.save();

        // Respond with the created task
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Error creating task" });
    }
});

// Get a single task by ID
app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error("Error fetching task by ID:", error);
        res.status(500).json({ error: "Error fetching task by ID" });
    }
});


// Update a task by ID
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, status, priority } = req.body;
        
        // Validate incoming data (optional)
        if (!title || !description || !dueDate || !status || !priority) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const isoDueDate = moment(dueDate, 'DD-MM-YYYY').toISOString();

        // Find task by ID and update
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, dueDate: new Date(isoDueDate), status, priority },
            { new: true } // Return updated document
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(updatedTask); // Return updated task as JSON response
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Error updating task" });
    }
});



// Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Error deleting task" });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
