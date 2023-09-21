import { ITodo } from "@/types";

export default function TodoList({ items }: { items: ITodo[] }) {
    if (items.length === 0) {
        return <p>There&apos;s nothing to do.</p>;
    }
    return (
        <ul data-cy="todos">
            {items.map(item => (
                <li key={item._id}>{item.title}</li>
            ))}
        </ul>
    );
}
