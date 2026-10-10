const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const goalRoutes = require("./routes/goals");
const habitRoutes = require("./routes/habits");
const topicRoutes = require("./routes/topics");

console.log(
    "Loaded topic routes:",
    topicRoutes.stack.map(route => ({
        methods: Object.keys(route.route.methods),
        path: route.route.path
    }))
);
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/topics", topicRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "PIKO backend is running.",
        test: "UPDATED SERVER.JS"
    });
});

app.get("/test-topics", (req, res) => {
    res.json({ message: "Test route works!" });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(process.env.PORT, () => {
            console.log(
                `PIKO backend running on http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed");
        console.error(error);
    });

