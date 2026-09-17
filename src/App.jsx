import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevtodo) => (prevtodo.id === todo.id ? todo : prevtodo)),
    );
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "pending") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1; // no date → last
      if (!b.dueDate) return -1; // no date → last

      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#F5E6D3] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto border border-[#C8B8A6] shadow-md rounded-lg px-4 py-4 text-[#172033] bg-[#FFF9F0]">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex gap-2 mb-4 justify-center">
            {[
              ["all", "All Tasks"],
              ["pending", "Pending"],
              ["completed", "Completed"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-lg px-3 py-1.5 text-sm ${
                  filter === value
                    ? "bg-[#172033] text-white"
                    : "bg-white border border-[#C8B8A6]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {filteredTodos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
