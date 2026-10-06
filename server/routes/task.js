const express = require("express");
const Task = require("../models/Task");

const router = express.Router();


// =========================
// GET ALL TASKS FOR A USER
// =========================

router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                message: "userId is required"
            });
        }

        const tasks = await Task.find({ userId })
            .sort({ createdAt: -1 });

        res.json(tasks);
    } catch (error) {
        console.error("Get tasks error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// =========================
// CREATE TASK
// =========================

router.post("/", async (req, res) => {
    try {
        const {
            text,
            priority,
            dueDate,
            userId
        } = req.body;

        if (!text || !userId) {
            return res.status(400).json({
                message: "Task text and userId are required"
            });
        }

        const task = new Task({
            text,
            priority,
            dueDate,
            userId
        });

        await task.save();

        res.status(201).json({
            message: "Task created successfully",
            task
        });
    } catch (error) {
        console.error("Create task error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// =========================
// UPDATE TASK
// =========================

router.put("/:id", async (req, res) => {
    try {
        const {
            text,
            priority,
            dueDate,
            userId
        } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "userId is required"
            });
        }

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                userId
            },
            {
                text,
                priority,
                dueDate
            },
            {
                new: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task updated successfully",
            task
        });
    } catch (error) {
        console.error("Update task error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// =========================
// TOGGLE TASK
// =========================

router.patch("/:id/toggle", async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "userId is required"
            });
        }

        const task = await Task.findOne({
            _id: req.params.id,
            userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        task.completed = !task.completed;

        await task.save();

        res.json({
            message: "Task status updated successfully",
            task
        });
    } catch (error) {
        console.error("Toggle task error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// =========================
// DELETE TASK
// =========================

router.delete("/:id", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                message: "userId is required"
            });
        }

        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error("Delete task error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


module.exports = router;