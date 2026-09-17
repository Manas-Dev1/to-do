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
    <form
      onSubmit={add}
      className="flex flex-col gap-3 justify-center mx-auto md:flex-row md:gap-0"
    >
      <input
        type="text"
        placeholder="Write Todo"
        className="w-full border border-black/30 rounded-lg md:rounded-l-lg md:rounded-r-none px-3 outline-none duration-150 bg-white py-1.5 text-[#172033]"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <div className="flex w-full md:w-auto">
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          className="min-w-0 w-full bg-gray-200 px-2 rounded-l-lg border border-black/30 md:w-auto md:rounded-none"
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-r-lg md:rounded-r-lg border border-black/30 md:rounded-l-none px-3 py-1 bg-[#F4C95D] hover:bg-[#E8B83F] text-black shrink-0"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
