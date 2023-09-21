import { Request, Response } from "express";
import Todo from "../models/todoModel";

const testingController = {
    resetTodos: async (req: Request, res: Response) => {
        try {
            await Todo.deleteMany({});
            res.status(200).end();
        } catch (error) {
            // console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

export default testingController;
