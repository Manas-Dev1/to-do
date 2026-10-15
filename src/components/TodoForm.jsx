import React, { useState } from "react";
import { useTodo } from "../contexts";
import ConfirmDialog from "./ConfirmDialog";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showDuplicateConfirmation, setShowDuplicateConfirmation] =
    useState(false);
  const { addTodo, todos } = useTodo();

  const saveTodo = () => {
    addTodo({ todo: todo.trim(), completed: false, dueDate: date });
    setTodo("");
    setDate(new Date().toISOString().split("T")[0]);
    setShowDuplicateConfirmation(false);
  };

  const add = (e) => {
    e.preventDefault();
    const normalizedTodo = todo.trim().toLocaleLowerCase();
    if (!normalizedTodo) return;

    const isDuplicate = todos.some(
      (item) => item.todo.trim().toLocaleLowerCase() === normalizedTodo,
    );
    if (isDuplicate) {
      setShowDuplicateConfirmation(true);
      return;
    }

    saveTodo();
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
        minLength={1}
        maxLength={100}
        pattern="^(?=.*[a-zA-Z0-9])[a-zA-Z0-9 ]+$"
        required
      />
      <div className="flex w-full md:w-auto">
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          className="min-w-0 w-full bg-gray-200 px-2 rounded-l-lg border border-black/30 md:w-auto md:rounded-none"
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button
          type="submit"
          className="rounded-r-lg md:rounded-r-lg border border-black/30 md:rounded-l-none px-3 py-1 bg-[#F4C95D] hover:bg-[#E8B83F] text-black shrink-0"
        >
          Add
        </button>
      </div>
      <ConfirmDialog
        open={showDuplicateConfirmation}
        title="Task already exists"
        message={`A task named “${todo.trim()}” is already on your list. Do you want to add it again?`}
        confirmLabel="Add again"
        cancelLabel="Cancel"
        onCancel={() => setShowDuplicateConfirmation(false)}
        onConfirm={saveTodo}
      />
    </form>
  );
}

export default TodoForm;
