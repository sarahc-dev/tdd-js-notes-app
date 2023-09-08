import express from "express";
import todosController from "../controllers/todosController"

const router = express.Router()

router.get("/", todosController.getAllTodos)

export default router;

