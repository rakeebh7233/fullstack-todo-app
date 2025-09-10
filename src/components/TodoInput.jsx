import { useRef, useEffect } from "react";

export function TodoInput(props) {
    const { handleAddTodo, inputValue, setInputValue,
        shouldFocusInput, setShouldFocusInput } = props;
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
                ref = {inputRef}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }} 
                placeholder="Add a new task..." />
            <button onClick={() => {
                if (!inputValue) return;
                handleAddTodo(inputValue);
                setInputValue("");
            }}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    );
}