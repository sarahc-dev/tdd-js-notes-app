import Checkbox from "./Checkbox";
import useTodoApi from "@/hooks/useTodoApi";
import { ITodo } from "@/types";

export default function TodoItem({ todo }: { todo: ITodo }) {
    const { editTodo } = useTodoApi();

    const handleEditTodo = () => {
        editTodo(todo._id, { completed: !todo.completed });
        todo.completed = !todo.completed;
    };

    return (
        <li className={`flex mb-3 list-none ${todo.completed && "line-through"}`}>
            <Checkbox toggleCheckbox={handleEditTodo} complete={todo.completed} />
            <div className="ml-3">{todo.title}</div>
        </li>
    );
}
