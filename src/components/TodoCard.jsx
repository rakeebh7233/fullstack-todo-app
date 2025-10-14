import { useAuth } from "../context/AuthContext";

export function TodoCard(props) {
    const { todo, todoIndex, handleCompleteTodo, handleEditTodo, handleDeleteTodo } = props;
    const { token } = useAuth();
    return (
        <div className="card todo-item">
            <p>{todo.input}</p>
            <div className="todo-buttons">
                <button onClick={() => {
                    handleCompleteTodo(todoIndex);
                }} disabled={todo.complete || !token}>
                    <h6>Done</h6>
                </button>
                <button onClick={() => {
                    handleEditTodo(todoIndex);
                }} disabled={!token}>
                    <h6>Edit</h6>
                </button>
                <button onClick={() => {
                    handleDeleteTodo(todoIndex);
                }} disabled={!token}>
                    <h6>Delete</h6>
                </button>
            </div>
        </div>
    );
}