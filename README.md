# TaskManager – Task Manager Web Application

A responsive, full-featured **Task Manager** built with **React**, **JavaScript**, and **Bootstrap 5**.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript)

---

## ✨ Features

- **Add Tasks** – Create tasks with title, description, priority, category, and due date
- **Edit Tasks** – Update any task details inline
- **Delete Tasks** – Remove individual tasks or clear all completed at once
- **Complete Tasks** – Check off tasks with a single click
- **Filter Tasks** – View All / Active / Completed / High Priority
- **Search** – Real-time search across task titles and descriptions
- **Stats Bar** – Live counters for total, active, done, high priority, and overdue tasks
- **Overdue Detection** – Highlights tasks past their due date
- **Persistent Storage** – Tasks saved to `localStorage` (survive page refresh)
- **Toast Notifications** – Visual feedback for add / update / delete actions
- **Fully Responsive** – Works seamlessly on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 18 | UI library, component architecture |
| React Hooks | `useState`, `useEffect`, `useCallback` |
| Bootstrap 5 | Responsive layout, utility classes |
| Bootstrap Icons | Icon set |
| CSS Variables | Custom theming |
| localStorage | Client-side persistence |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16
- npm ≥ 8

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/task-manager-app.git

# 2. Navigate into the project
cd task-manager-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

App will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
task-manager-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js        # Top navigation bar
│   │   ├── StatsBar.js      # Live task statistics
│   │   ├── TaskForm.js      # Add / Edit task form
│   │   ├── TaskList.js      # Filtered task list
│   │   └── TaskCard.js      # Individual task card
│   ├── App.js               # Root component, state management
│   ├── index.js             # React entry point
│   └── index.css            # Global styles & CSS variables
├── package.json
└── README.md
```

---

## 💡 Key React Concepts Used

- **Component-Based Design** – App broken into reusable, single-responsibility components
- **useState Hook** – Local state for tasks, filters, search, edit mode, and toast
- **useEffect Hook** – Syncs task state to localStorage on every change
- **useCallback Hook** – Memoizes event handlers for performance
- **Controlled Inputs** – All form fields are fully controlled components
- **Lifting State Up** – Shared state managed in `App.js`, passed as props
- **Conditional Rendering** – Empty states, edit mode, overdue indicators

---


## 📄 License

MIT License – feel free to use and modify.
