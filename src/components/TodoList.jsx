import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase';

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const fetchTodos = async () => {
        const { data, error } = await supabase.from("Todos").select("*");
        if (error) {
            console.error("Error fetching todos: ", error);
        } else {
            setTodoList(data);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async () => {
        const newTodoData = {
            name: newTodo,
            isCompleted: false
        }
        const { data, error } = await supabase
            .from("Todos")
            .insert([newTodoData])
            .select()
            .single();
        console.log("todo data", data);
        if (error) {
            console.error("Error adding todo: ", error);
        } else {
            setTodoList((prev) => [...prev, data]);
            setNewTodo("");
        }
    };

    const completeTask = async (id, isCompleted) => {
        const { data, error } = await supabase
            .from("Todos")
            .update({ isCompleted: !isCompleted })
            .eq("id", id);

        if (error) {
            console.error("Error toggling task: ", error);
        } else {
            const updatedTodoList = todoList.map((todo) => todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo);
            setTodoList(updatedTodoList);
        }
    };

    const deleteTask = async (id) => {
        const { data, error } = await supabase
            .from("Todos")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting task: ", error);
        } else {
            setTodoList((prev) => prev.filter((todo) => todo.id !== id));
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <div>
                <input
                    type="text"
                    placeholder='New Todo...'
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={addTodo}>Add Todo Item</button>
            </div>
            <ul>
                {
                    todoList?.map((todo, index) => (
                        <li key={`${todo.id}-${index}`}>
                            <p>{todo.name}</p>
                            <button onClick={() => completeTask(todo.id, todo.isCompleted)}>{todo.isCompleted ? "Undo" : "Complete Task"}</button>
                            <button onClick={() => deleteTask(todo.id)}>Delete Task</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TodoList