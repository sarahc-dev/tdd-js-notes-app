import express from "express";
import todosController from "../controllers/todosController";

const router = express.Router();

router.get("/", todosController.getAllTodos);
router.post("/", todosController.addTodo);

export default router;
