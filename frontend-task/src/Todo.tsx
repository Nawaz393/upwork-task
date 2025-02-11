import React, { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const initialTodos = response.data.slice(0, 20);
        setTodos(initialTodos);
        localStorage.setItem("todos", JSON.stringify(initialTodos));
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

 fetchTodos()
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = () => {
    if (!newTodo.trim()) return;
    const newTask: Todo = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  // Toggle completion status
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">📌 To-Do List</h1>

      {/* Add new todo */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="px-4 py-2 border rounded-lg w-64 focus:ring focus:ring-blue-300"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Filter options */}
      <div className="mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 mx-1 rounded-lg ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 mx-1 rounded-lg ${
            filter === "completed" ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-1 mx-1 rounded-lg ${
            filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-300"
          }`}
        >
          Pending
        </button>
      </div>

      {/* To-do list */}
      <ul className="bg-white shadow-lg rounded-lg w-96 p-4">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-2 border-b last:border-none"
          >
            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => toggleComplete(todo.id)}
              className={`px-2 py-1 rounded-lg ${
                todo.completed ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
            >
              {todo.completed ? "Undo" : "Done"}
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white px-2 py-1 rounded-lg ml-2"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
