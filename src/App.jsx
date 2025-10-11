import { useState, useEffect } from 'react';
import { Header } from './components/Header'
import { Tabs } from './components/Tabs'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import Modal from './components/Modal';
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [inputValue, setInputValue] = useState("");
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleAddTodo(newTodo) {
    let newTodoList = [...todos, { input: newTodo, complete: false }];
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleCompleteTodo(todoIndex) {
    let newTodoList = [...todos];
    newTodoList[todoIndex].complete = true;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleEditTodo(todoIndex) {
    handleDeleteTodo(todoIndex);
    setInputValue(todos[todoIndex].input);
    setShouldFocusInput(true);
  }

  function handleDeleteTodo(todoIndex) {
    let newTodoList = todos.filter((todo, index) => index !== todoIndex);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleSaveData(currentTodos) {
    localStorage.setItem("todo-app", JSON.stringify({ todos: currentTodos }));
  }

  // CRUD - GET
  async function fetchTodos() {
    setIsLoading(true);
    try {
      const response = await fetch('/api/todos', {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });
      setTodos(await response.json());
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  useEffect(() => {
    if (token) {
      fetchTodos();
    } 
    console.log(token)
  }, []);

  return (
    <>
      {showModal && (
        <Modal setShowModal={setShowModal} handleCloseModal={handleCloseModal}></Modal>
      )}

      <Header todos={todos} setShowModal={setShowModal} />
      <Tabs todos={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TodoList todos={todos} selectedTab={selectedTab} handleCompleteTodo={handleCompleteTodo} handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} />
      <TodoInput
        handleAddTodo={handleAddTodo}
        inputValue={inputValue}
        setInputValue={setInputValue}
        shouldFocusInput={shouldFocusInput}
        setShouldFocusInput={setShouldFocusInput}
      />
    </>
  )
}

export default App
