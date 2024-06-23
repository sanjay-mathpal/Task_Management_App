import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'completed'], 
        default: 'pending' 
      },
      priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        default: 'medium' 
      },
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);