"use client";

import { useState } from "react";

export default function TodoForm({ onSubmit }: { onSubmit: (todo: string) => void }) {
    const [todo, setTodo] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(todo);
        setTodo("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" data-cy="todo-input" value={todo} onChange={handleChange} className="border-b" />
            <button type="submit" data-cy="todo-submit">
                Add
            </button>
        </form>
    );
}
