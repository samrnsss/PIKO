const express = require("express");
const Goal = require("../models/Goal");

const router = express.Router();

// GET: Fetch goals for a specific user
router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const goals = await Goal.find({ userId }).sort({
            createdAt: -1
        });

        res.json(goals);
    } catch (error) {
        console.error("Fetch goals error:", error);
        res.status(500).json({
            message: "Failed to fetch goals"
        });
    }
});

// POST: Create a new goal
router.post("/", async (req, res) => {
    try {
        const { text, dueDate, userId } = req.body;

        if (!text || !text.trim() || !userId) {
            return res.status(400).json({
                message: "Goal text and user ID are required"
            });
        }

        const goal = await Goal.create({
            text: text.trim(),
            dueDate: dueDate || "",
            userId
        });

        res.status(201).json({
            message: "Goal created successfully",
            goal
        });
    } catch (error) {
        console.error("Create goal error:", error);
        res.status(500).json({
            message: "Failed to create goal"
        });
    }
});

// PUT: Update a goal
router.put("/:id", async (req, res) => {
    try {
        const { text, dueDate, userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const goal = await Goal.findOneAndUpdate(
            {
                _id: req.params.id,
                userId
            },
            {
                text: text?.trim(),
                dueDate: dueDate || ""
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found"
            });
        }

        res.json({
            message: "Goal updated successfully",
            goal
        });
    } catch (error) {
        console.error("Update goal error:", error);
        res.status(500).json({
            message: "Failed to update goal"
        });
    }
});

// PATCH: Toggle goal completion
router.patch("/:id/toggle", async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const goal = await Goal.findOne({
            _id: req.params.id,
            userId
        });

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found"
            });
        }

        goal.completed = !goal.completed;

        await goal.save();

        res.json({
            message: "Goal updated successfully",
            goal
        });
    } catch (error) {
        console.error("Toggle goal error:", error);
        res.status(500).json({
            message: "Failed to update goal"
        });
    }
});

// DELETE: Delete a goal
router.delete("/:id", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const goal = await Goal.findOneAndDelete({
            _id: req.params.id,
            userId
        });

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found"
            });
        }

        res.json({
            message: "Goal deleted successfully"
        });
    } catch (error) {
        console.error("Delete goal error:", error);
        res.status(500).json({
            message: "Failed to delete goal"
        });
    }
});

module.exports = router;