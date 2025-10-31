import { useAuth } from "../context/AuthContext";

export function Header(props) {
    const { todos, setShowModal } = props;
    const { token, logout } = useAuth();
    const todosLength = todos.filter(todo => !todo.completed).length
    const isTasksPlural = todosLength !== 1;
    const taskOrTasks = isTasksPlural ? 'tasks' : 'task';

    function handleLoginLogout() {
        if (token) {
            logout();
        } else {
            setShowModal(true)
        }
    }
    
    return (
        <header>
            <h1 className="text-gradient">
                {token ? (<>You have {todosLength} open {taskOrTasks}.</>): "Please Login to continue!"
                }
            </h1>
            <button onClick={handleLoginLogout}>{token? "Logout":"Login"}</button>
        </header>
    );
} 