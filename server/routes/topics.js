const express = require("express");
const Topic = require("../models/Topic");

const router = express.Router();

// GET all topics for a user
router.get("/", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const topics = await Topic.find({ userId }).sort({ createdAt: -1 });
        res.json(topics);
    } catch (error) {
        console.error("Error fetching topics:", error);
        res.status(500).json({ message: "Failed to fetch topics" });
    }
});

// ADD a topic
router.post("/", async (req, res) => {
    try {
        const { name, userId } = req.body;

        if (!name || !name.trim() || !userId) {
            return res.status(400).json({
                message: "Name and User ID are required"
            });
        }

        const topic = await Topic.create({
            name: name.trim(),
            userId
        });

        res.status(201).json({
            message: "Topic created successfully",
            topic
        });
    } catch (error) {
        console.error("Error creating topic:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// EDIT a topic
router.put("/:id", async (req, res) => {
    try {
        const { name, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const topic = await Topic.findOneAndUpdate(
            { _id: req.params.id, userId },
            { name: name?.trim() },
            { new: true, runValidators: true }
        );

        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        res.json({ message: "Topic updated successfully", topic });
    } catch (error) {
        console.error("Error updating topic:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// TOGGLE completion
router.patch("/:id/toggle", async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const topic = await Topic.findOne({
            _id: req.params.id,
            userId
        });

        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        topic.completed = !topic.completed;
        await topic.save();

        res.json({ message: "Topic updated successfully", topic });
    } catch (error) {
        console.error("Error toggling topic:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE a topic
router.delete("/:id", async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const topic = await Topic.findOneAndDelete({
            _id: req.params.id,
            userId
        });

        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        res.json({ message: "Topic deleted successfully" });
    } catch (error) {
        console.error("Error deleting topic:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;