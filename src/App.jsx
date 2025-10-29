import { useState, useEffect } from 'react';
import { Header } from './components/Header'
import { Tabs } from './components/Tabs'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import Modal from './components/Modal';
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth();
  const [todos, setTodos] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [inputValue, setInputValue] = useState("");
  const [shouldFocusInput, setShouldFocusInput] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // CRUD LOGIC
  async function fetchTodos() {
    try {
      const response = await fetch('/api/todos', {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });
      setTodos(await response.json());
    } catch (err) {
      console.log(err.message);
    }
  }

  async function createTodo() {
    try {
      const response = await fetch('api/todos', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ task: inputValue })
      });
      fetchTodos();
    } catch (err) {
      console.log(err.message);
    }
  }

  async function updateTodo(id, updatedTask, updatedCompleted) {
    try {
      await fetch(`api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ task: updatedTask, completed: updatedCompleted })
      });
      fetchTodos();
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleEditTodo(todo) {
    setInputValue(todo.task);
    setShouldFocusInput(true);
  }

  async function deleteTodo(id) {
    try {
      await fetch(`api/todos/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      fetchTodos();
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  useEffect(() => {
    if (token) {
      fetchTodos();
    } else {
      setTodos([]);
    }
    console.log(token);
  }, [token]);

  return (
    <>
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}></Modal>
      )}

      <Header todos={todos} setShowModal={setShowModal} />
      <Tabs todos={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TodoList
        todos={todos}
        selectedTab={selectedTab}
        updateTodo={updateTodo}
        setEditingTask={setEditingTask}
        handleEditTodo={handleEditTodo}
        deleteTodo={deleteTodo}
      />
      <TodoInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        shouldFocusInput={shouldFocusInput}
        setShouldFocusInput={setShouldFocusInput}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        updateTodo={updateTodo}
        createTodo={createTodo}
      />
    </>
  )
}

export default App
