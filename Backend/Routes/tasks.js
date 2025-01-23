const express = require("express");
const Task = require("../Models/Task");
const authMiddleware = require("../Middleware/auth.middleware");
const router = express.Router();

// Create a new task
router.post("/", authMiddleware, async (req, res) => {
    const { title, description, dueDate, priority, status, assignedTo } = req.body;
    
    try {
        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            status,
            createdBy: req.userId,
            assignedTo,
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
})

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
    
    try {
        const tasks = await Task.find({ createdBy: req.userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
})

// Update a task
router.put("/:id", authMiddleware, async (req, res) => {
    const { title, description, dueDate, priority, status, assignedTo } = req.body;
    
    try {
        const task = await Task.findOne({ _id: req.params.id, createdBy: req.userId });
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.status = status;
        task.assignedTo = assignedTo;
        
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
})

// Delete a task

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.userId });

        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
})

module.exports = router;