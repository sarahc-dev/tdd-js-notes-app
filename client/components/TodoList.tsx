import TodoItem from "./TodoItem";
import { ITodo } from "@/types";

export default function TodoList({ items }: { items: ITodo[] }) {
    if (items.length === 0) {
        return <p>There&apos;s nothing to do.</p>;
    }

    return (
        <ul className="mt-4" data-cy="todos">
            {items.map(item => (
                <TodoItem key={item._id} todo={item} />
            ))}
        </ul>
    );
}
