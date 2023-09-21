import express from "express";
import cors from "cors";
import todosRouter from "./routes/todosRouter";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/todos", todosRouter);

export default app;
