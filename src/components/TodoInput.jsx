import { useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function TodoInput(props) {
    const { handleAddTodo, inputValue, setInputValue,
        shouldFocusInput, setShouldFocusInput } = props;
    const { token } = useAuth();
    const inputRef = useRef(null)

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
                handleAddTodo(inputValue);
                setInputValue("");
            }}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    );
}