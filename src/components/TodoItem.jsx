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
      className={`flex flex-col gap-2 border border-black/10 rounded-lg px-3 py-1.5 shadow-sm shadow-white/50 duration-300 text-black sm:flex-row sm:items-center sm:gap-x-3 ${todo.completed ? "text-[#65756A] bg-[#E5F1E8] line-through " : "bg-white"}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <input
          type="checkbox"
          name=""
          id=""
          className="shrink-0 cursor-pointer bg-[#5B9A6F]"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <input
          type="text"
          name=""
          id=""
          className={`min-w-0 flex-1 px-2 py-1 border outline-none bg-transparent rounded-sm ${isTodoEditable ? "border-black/50 px-2" : "border-black/10"}`}
          value={todoMsg}
          readOnly={!isTodoEditable}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              editTodo();
            }
          }}
          onChange={(e) => setTodoMsg(e.target.value)}
        />
      </div>
      <div className="flex w-full gap-2 sm:w-auto">
        <input
          type="date"
          value={todo.dueDate}
          onChange={(e) =>
            updateTodo(todo.id, {
              ...todo,
              dueDate: e.target.value,
            })
          }
          className="min-w-0 flex-1 ring ring-black/40 px-2 py-1 rounded-sm text-xs bg-[#F4C95D]/40 sm:w-auto"
          readOnly={todo.completed}
        />
        <button
          className="inline-flex rounded-sm text-md border border-black/40 justify-center items-center bg-[#E8F0FE] text-[#315A9E] shrink-0 disabled:opacity-50 px-2 py-1"
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
          {isTodoEditable ? (
            <svg
              viewBox="-0.96 -0.96 25.92 25.92"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
              stroke-width="0.00024000000000000003"
              className="w-5 h-5"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"
                  fill="#0F0F0F"
                ></path>{" "}
              </g>
            </svg>
          ) : (
            <svg
              fill="#000000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="-29.7 -29.7 554.34 554.34"
              xml:space="preserve"
              stroke="#000000"
              stroke-width="3.4645520000000003"
              className="w-5 h-5"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157 c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21 s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741 c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"></path>{" "}
                    <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069 c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963 c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692 C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107 l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005 c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          )}
        </button>
        <button
          className="inline-flex shrink-0 px-1 justify-center items-center"
          onClick={() => deleteTodo(todo.id)}
        >
          <svg
            viewBox="-0.96 -0.96 25.92 25.92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            stroke-width="0.144"
            className="w-3.5 h-3.5"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                fill="#0F0F0F"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
