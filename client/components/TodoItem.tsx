import { ITodo } from "@/types";

export default function TodoItem({ todo }: { todo: ITodo }) {
    return (
        <li className={`list-none ${todo.completed && "line-through"}`}>
            <div>{todo.title}</div>
        </li>
    );
}
