import express from "express";
import todosRouter from "./routes/todosRouter";

const app = express();
app.use(express.json());

app.use("/todos", todosRouter);

export default app;
