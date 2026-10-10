const express = require("express");
const Habit = require("../models/Habit");

const router = express.Router();

// GET: Fetch habits for a specific user
router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const habits = await Habit.find({ userId }).sort({
            createdAt: -1
        });

        res.json(habits);
    } catch (error) {
        console.error("Fetch habits error:", error);
        res.status(500).json({
            message: "Failed to fetch habits"
        });
    }
});

// POST: Create a new habit
router.post("/", async (req, res) => {
    try {
        const { name, userId } = req.body;

        if (!name || !name.trim() || !userId) {
            return res.status(400).json({
                message: "Habit name and user ID are required"
            });
        }

        const habit = await Habit.create({
            name: name.trim(),
            userId
        });

        res.status(201).json({
            message: "Habit created successfully",
            habit
        });
    } catch (error) {
        console.error("Create habit error:", error);
        res.status(500).json({
            message: "Failed to create habit"
        });
    }
});

// PUT: Update a habit
router.put("/:id", async (req, res) => {
    try {
        const { name, userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const habit = await Habit.findOneAndUpdate(
            {
                _id: req.params.id,
                userId
            },
            {
                name: name?.trim()
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!habit) {
            return res.status(404).json({
                message: "Habit not found"
            });
        }

        res.json({
            message: "Habit updated successfully",
            habit
        });
    } catch (error) {
        console.error("Update habit error:", error);
        res.status(500).json({
            message: "Failed to update habit"
        });
    }
});

// PATCH: Toggle habit completion
router.patch("/:id/toggle", async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const habit = await Habit.findOne({
            _id: req.params.id,
            userId
        });

        if (!habit) {
            return res.status(404).json({
                message: "Habit not found"
            });
        }

        habit.completed = !habit.completed;

        await habit.save();

        res.json({
            message: "Habit updated successfully",
            habit
        });
    } catch (error) {
        console.error("Toggle habit error:", error);
        res.status(500).json({
            message: "Failed to update habit"
        });
    }
});

// DELETE: Delete a habit
router.delete("/:id", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const habit = await Habit.findOneAndDelete({
            _id: req.params.id,
            userId
        });

        if (!habit) {
            return res.status(404).json({
                message: "Habit not found"
            });
        }

        res.json({
            message: "Habit deleted successfully"
        });
    } catch (error) {
        console.error("Delete habit error:", error);
        res.status(500).json({
            message: "Failed to delete habit"
        });
    }
});

module.exports = router;