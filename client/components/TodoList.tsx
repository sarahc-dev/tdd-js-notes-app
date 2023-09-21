interface ITodo {
    _id: string;
    title: string;
    completed: boolean;
}

export default function TodoList({ items }: { items: ITodo[] }) {
    if (items.length === 0) {
        return <p>There&apos;s nothing to do.</p>;
    }
    return (
        <ul>
            {items.map(item => (
                <li key={item._id}>{item.title}</li>
            ))}
        </ul>
    );
}
