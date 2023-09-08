import express from "express";
import mongoose from "mongoose";
import Todo from "./models/todoModel";

const app = express();
const port = 8080;

export const getDbUrl = () => `mongodb://0.0.0.0/${process.env.NODE_ENV === "test" ? "todolist_test" : "todolist"}`

mongoose.connect(getDbUrl());
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find({})
        res.status(200).json(todos)
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ error: 'Internal server error' })
    }
});

export const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;
