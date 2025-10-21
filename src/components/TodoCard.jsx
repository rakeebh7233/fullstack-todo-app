import { useAuth } from "../context/AuthContext";

export function TodoCard(props) {
    const { todo, handleEditTodo, setEditingTask ,deleteTodo, updateTodo } = props;
    const { token } = useAuth();
    return (
        <div className="card todo-item">
            <p>{todo.task}</p>
            <div className="todo-buttons">
                <button onClick={() => {
                    updateTodo(todo.id, todo.task, 1);
                }} disabled={todo.completed || !token}>
                    <h6>Done</h6>
                </button>
                <button onClick={() => {
                    setEditingTask(todo.id);
                    handleEditTodo(todo);
                }} disabled={!token}>
                    <h6>Edit</h6>
                </button>
                <button onClick={() => {
                    deleteTodo(todo.id);
                }} disabled={!token}>
                    <h6>Delete</h6>
                </button>
            </div>
        </div>
    );
}