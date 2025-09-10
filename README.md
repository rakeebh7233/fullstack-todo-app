# React To-Do App

A simple and intuitive **To-Do List** application built with **React** and **Vite**.  
This app lets you manage tasks efficiently with features like filtering, completion tracking, and data persistence.

🔗 **Live Demo:** [React To-Do App on Netlify](https://rakeeb-todo-app.netlify.app/)

---

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup & Run](#setup--run)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Credits](#credits)

---

## Features
- **Add**, **Edit**, and **Delete** tasks
- Mark tasks as **completed / uncompleted**
- **Filter tasks** by status: All, Active, Completed
- **Persistent storage** — tasks are saved in **localStorage**
- Real-time **Hot Module Replacement** via Vite
- Lightweight and minimal setup

## Demo
🔗 [Click here to try the app](https://rakeeb-todo-app.netlify.app/)

<img width="817" height="431" alt="image" src="https://github.com/user-attachments/assets/00ee202d-725c-48a3-a8f2-c6f5dfb3c577" />

## Technologies
- **React** (with hooks like `useState` & `useEffect`)  
- **Vite** — fast development build tool  
- **LocalStorage** — for persistence  
- **ESLint** — code quality  
- **CSS** — styling

## Getting Started

### Prerequisites
Make sure you have **Node.js** (v14+) and **npm** or **yarn** installed.

### Setup & Run
```bash
# Clone the repo
git clone https://github.com/rakeebh7233/react-todo-app.git

# Navigate into the project
cd react-todo-app

# Install dependencies
npm install
# Run the development server
npm run dev
```
Then, open your browser and go to http://localhost:5173.

### Usage
* Add a task: Enter text in the input field and hit Enter or click "Add".
* Mark Complete/incomplete: Use the button next to each task.
* Filter tasks: Switch between All, Active, or Completed views.
* Delete a task: Click the delete button next to a task.
* Edit a task: Click the edit button next to a task
* Persistence: Tasks remain saved in your browser even after refresh (via localStorage).

## Project Structure
```
react-todo-app/
├── public/
├── src/
│   ├── components/        # React components (e.g., TodoCard, TodoList, Input)
│   ├── App.jsx            # Main app logic
│   ├── index.jsx          # Entry point
│   └── styles/            # CSS files
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```
--- 
## Credits
- CSS styling adapted from **Fantacss** by [jamezmca](https://github.com/jamezmca/fantacss) — licensed under the **MIT License**.

