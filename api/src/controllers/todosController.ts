import { Request, Response } from "express";
import Todo from "../models/todoModel";

const todosController = {
    getAllTodos: async (req: Request, res: Response) => {
        try {
            const todos = await Todo.find({});
            res.status(200).json(todos);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    addTodo: async (req: Request, res: Response) => {
        try {
            const newTodo = await new Todo(req.body).save();
            res.status(201).json(newTodo);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

export default todosController;
