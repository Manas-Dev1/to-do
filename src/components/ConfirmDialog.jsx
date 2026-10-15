import { useEffect } from "react";

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Proceed",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  danger = false,
}) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCancel();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        className="w-full max-w-sm rounded-xl border border-[#C8B8A6] bg-[#FFF9F0] p-5 text-[#172033] shadow-2xl"
      >
        <h2 id="confirm-dialog-title" className="text-lg font-bold">
          {title}
        </h2>
        <p id="confirm-dialog-message" className="mt-2 text-sm text-[#526071]">
          {message}
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[#C8B8A6] bg-white px-4 py-2 text-sm hover:bg-[#F5E6D3]"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
              danger
                ? "bg-[#B94444] hover:bg-[#9F3535]"
                : "bg-[#315A9E] hover:bg-[#25477E]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmDialog;
