import React, { useState } from "react";
import { useTodo } from "../contexts";
function TodoItem({ todo }) {
  const [isTodoEditable, setTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete, todos } = useTodo();
  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setTodoEditable(false);
  };
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${todo.completed ? "text-[#65756A] bg-[#E5F1E8] line-through " : "bg-white"}`}
    >
      <input
        type="checkbox"
        name=""
        id=""
        className="cursor-pointer bg-[#5B9A6F]"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        name="edit box"
        id=""
        className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/30 px-2" : "border-transparent"}`}
        value={todoMsg}
        readOnly={!isTodoEditable}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            editTodo();
          }
        }}
        onChange={(e) => setTodoMsg(e.target.value)}
      />
      <input
        type="date"
        value={todo.dueDate}
        onChange={(e) =>
          updateTodo(todo.id, {
            ...todo,
            dueDate: e.target.value,
          })
        }
        className="shrink-0 ring ring-black/40 px-2 py-1 rounded-lg text-xs bg-[#F4C95D]/40"
        readOnly={todo.completed}
      />
      <button
        className="inline-flex rounded-lg text-md border border-black/40 justify-center items-center bg-[#E8F0FE] text-[#315A9E] shrink-0 disabled:opacity-50 px-3"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else {
            setTodoEditable((prev) => !prev);
          }
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "Save" : "Edit"}
      </button>
      <button
        className="inline-flex px-3 rounded-lg text-sm border border-black/40 justify-center items-center bg-[#FDECEC] text-[#C94B4B] no-underline"
        onClick={() => deleteTodo(todo.id)}
      >
        X
      </button>
    </div>
  );
}

export default TodoItem;
