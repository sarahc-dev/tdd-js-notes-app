"use client";
import TodoForm from "@/components/TodoForm";

export default function Home() {
    const addTodo = (todo: string) => {
        console.log(todo);
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>TODO</h1>
            <TodoForm onSubmit={addTodo} />
        </main>
    );
}
