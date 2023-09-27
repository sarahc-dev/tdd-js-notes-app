import { useState, useRef, useEffect } from "react";
import Checkbox from "./Checkbox";
import IconButton from "./IconButton";
import useTodoApi from "@/hooks/useTodoApi";
import { ITodo } from "@/types";
import { RiDeleteBin6Line, RiCloseFill } from "react-icons/ri";
import { BsPencil } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";

export default function TodoItem({ todo }: { todo: ITodo }) {
    const { editTodo, deleteTodo } = useTodoApi();
    const [showEditButtons, setShowEditButtons] = useState<boolean>(false);
    const [deleted, setDeleted] = useState<boolean>(false);
    const [todoValue, setTodoValue] = useState<string>(todo.title);
    const editRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showEditButtons && editRef.current) editRef.current.focus();
    }, [showEditButtons]);

    const handleCompleted = async () => {
        await editTodo(todo._id, { completed: !todo.completed });
        todo.completed = !todo.completed;
    };

    const handleEditText = async () => {
        await editTodo(todo._id, { title: todoValue });
        setShowEditButtons(false);
        todo.title = todoValue;
    };

    const handleDeclineEdit = () => {
        setTodoValue(todo.title);
        setShowEditButtons(false);
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
            <Checkbox toggleCheckbox={handleCompleted} complete={todo.completed} />
            <div className="mx-3">{showEditButtons ? <input type="text" data-cy="todo-edit" ref={editRef} value={todoValue} onChange={e => setTodoValue(e.target.value)} /> : <p onClick={handleCompleted}>{todoValue}</p>}</div>
            <div className="mr-2">
                {showEditButtons ? (
                    <div className="flex gap-2">
                        <IconButton action="confirm" Icon={FaCheck} handleClick={handleEditText} />
                        <IconButton action="decline" Icon={RiCloseFill} handleClick={handleDeclineEdit} />
                    </div>
                ) : (
                    <IconButton action="edit" Icon={BsPencil} handleClick={() => setShowEditButtons(true)} />
                )}
            </div>
            <IconButton action="delete" Icon={RiDeleteBin6Line} handleClick={handleDeleteTodo} />
        </li>
    );
}
