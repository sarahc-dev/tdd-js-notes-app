"use client";

import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import useTodoApi from "@/hooks/useTodoApi";
import { Oval } from "react-loader-spinner";

export default function Home() {
    const { todos, isLoading, addTodo } = useTodoApi();

    const handleAddTodo = async (todo: string) => {
        addTodo(todo);
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <h1>TODO</h1>
            <TodoForm onSubmit={handleAddTodo} />

            {isLoading ? <Oval height={24} width={24} color="#4fa94d" ariaLabel="oval-loading" /> : <TodoList items={todos} />}
        </main>
    );
}
