import { useAuth } from "../context/AuthContext";
import { TodoCard } from "./TodoCard";

export function TodoList(props) {
    const { todos, selectedTab } = props;
    const { token } = useAuth();

    if (!token) {
        return (
            <TodoCard 
                key={-1}
                todo={{ task: "Please Login to view your tasks."}}
                {...props}
            />
        )
    }

    const filteredTodos = selectedTab === "All" ?
        todos :
        selectedTab === "Completed" ?
            todos.filter(todo => todo.completed) :
            todos.filter(todo => !todo.completed);

    return (
        <>
            {filteredTodos.map((todo, todoIndex) => {
                return (
                    <TodoCard
                        key={todoIndex}
                        todo={todo}
                        {...props} />
                )

            })}
        </>
    );
}