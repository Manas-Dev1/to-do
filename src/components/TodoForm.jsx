import React, { useState } from "react";
import { useTodo, TodoContext } from "../contexts";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const { addTodo, todos } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false, dueDate: date });
    setTodo("");
    setDate("");
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        name=""
        id=""
        placeholder="Write Todo"
        className="w-full border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white py-1.5 text-[#172033]"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <input
        type="date"
        name=""
        id=""
        value={date}
        className="bg-gray-100 px-2"
        onChange={(e) => setDate(e.target.value)}
      />
      <button
        type="submit"
        onClick={add}
        className="rounded-r-lg px-3 py-1 bg-[#F4C95D] hover:bg-[#E8B83F] text-black shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
