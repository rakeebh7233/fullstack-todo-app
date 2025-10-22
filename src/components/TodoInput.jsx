import { useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function TodoInput(props) {
    const { inputValue, setInputValue, updateTodo, editingTask, setEditingTask,
        shouldFocusInput, setShouldFocusInput, createTodo } = props;
    const { token } = useAuth();
    const inputRef = useRef(null)

    // Focus input when edit is triggered
    useEffect(() => {
        if (shouldFocusInput && inputRef.current) {
            inputRef.current.focus();
            setShouldFocusInput(false);
        }
    }, [shouldFocusInput]);

    return (
        <div className="input-container">
            <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                placeholder="Add a new task..." 
                disabled = { !token } />
            <button disabled = { !token } onClick={() => {
                if (!inputValue) return;
                if (editingTask) {
                    updateTodo(editingTask, inputValue, 0);
                    setEditingTask(null);
                } else {
                    createTodo();
                }
                setEditingTask(null);
                setInputValue("");
            }}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    );
}