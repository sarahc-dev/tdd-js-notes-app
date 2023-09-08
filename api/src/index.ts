import express from "express";
import mongoose from "mongoose";
import todosRouter from "./routes/todosRouter"

const app = express();

export const getDbUrl = () => `mongodb://0.0.0.0/${process.env.NODE_ENV === "test" ? "todolist_test" : "todolist"}`

mongoose.connect(getDbUrl());
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/todos", todosRouter)

export default app;
