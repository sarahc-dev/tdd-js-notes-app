import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: { type: String }
})

const Todo = mongoose.model("Todo", TodoSchema)

export default Todo;