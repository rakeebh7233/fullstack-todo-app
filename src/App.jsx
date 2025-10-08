import { useState, useEffect } from 'react';
import { Header } from './components/Header'
import { Tabs } from './components/Tabs'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import Modal from './components/Modal';

function App() {

  const [todos, setTodos] = useState([
    { input: 'Hello! Add your first todo!', complete: true }
  ]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [inputValue, setInputValue] = useState("");
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const [showModal, setShowModal] = useState(false)

  function handleAddTodo(newTodo) {
    let newTodoList = [...todos, { input: newTodo, complete: false }];
    setTodos(newTodoList);
    handleSaveData(newTodoList)
  }

  function handleCompleteTodo(todoIndex) {
    let newTodoList = [...todos]
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

  function handleCloseModal() {
    setShowModal(false)
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem("todo-app")) { return; }
    let db = JSON.parse(localStorage.getItem("todo-app"));
    setTodos(db.todos);
  }, []);

  return (
    <>
      {showModal && (
        <Modal setShowModal={setShowModal}></Modal>
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
