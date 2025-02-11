import React, { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5").then((response) => {
        setTodos(response.data);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const newTask: Todo = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([newTask, ...todos]);
    setNewTodo("");
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="p-2 border rounded"
          placeholder="Add a new task..."
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      <div className="mb-4">
        <button onClick={() => setFilter("all")} className="px-4 py-2 mx-1 bg-gray-200 rounded">All</button>
        <button onClick={() => setFilter("completed")} className="px-4 py-2 mx-1 bg-gray-200 rounded">Completed</button>
        <button onClick={() => setFilter("pending")} className="px-4 py-2 mx-1 bg-gray-200 rounded">Pending</button>
      </div>
      <ul className="w-full max-w-md">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center bg-white p-2 my-2 shadow rounded">
            <span
              className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
