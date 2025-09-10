import { TodoCard } from "./TodoCard";

export function TodoList(props) {
    const { todos } = props;

    const tab = "All"; // This can be dynamic based on user selection
    const filteredTodos = tab === "All" ?
        todos :
        tab === "Completed" ?
            todos.filter(todo => todo.complete) :
            todos.filter(todo => !todo.complete);
    return (
        <>
            {filteredTodos.map((todo, todoIndex) => {
                return (
                    <TodoCard
                        key={todoIndex}
                        todo={todo} />
                )

            })}
        </>
    );
}