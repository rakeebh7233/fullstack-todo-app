import { useAuth } from "../context/AuthContext";

export function Header(props) {
    const { todos, setShowModal } = props;
    const { token } = useAuth();
    const todosLength = todos.length;
    const isTasksPlural = todosLength !== 1;
    const taskOrTasks = isTasksPlural ? 'tasks' : 'task';
    return (
        <header>
            <h1 className="text-gradient">
                {token ? (<>You have {todosLength} open {taskOrTasks}.</>): "Please Login to continue!"
                }
            </h1>
            <button onClick={() => setShowModal(true)}>{token? "Logout":"Login"}</button>
        </header>
    );
} 