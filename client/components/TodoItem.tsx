import { useState } from "react";
import Checkbox from "./Checkbox";
import DeleteButton from "./DeleteButton";
import useTodoApi from "@/hooks/useTodoApi";
import { ITodo } from "@/types";

export default function TodoItem({ todo }: { todo: ITodo }) {
    const { editTodo, deleteTodo } = useTodoApi();
    const [deleted, setDeleted] = useState<boolean>(false);

    const handleEditTodo = () => {
        editTodo(todo._id, { completed: !todo.completed });
        todo.completed = !todo.completed;
    };

    const handleDeleteTodo = async () => {
        const deletedTodo = await deleteTodo(todo._id);
        if (deletedTodo) setDeleted(true);
    };

    if (deleted) {
        return null;
    }

    return (
        <li className={`flex mb-3 list-none ${todo.completed && "line-through"}`}>
            <Checkbox toggleCheckbox={handleEditTodo} complete={todo.completed} />
            <div className="mx-3">{todo.title}</div>
            <DeleteButton handleDelete={handleDeleteTodo} />
        </li>
    );
}
