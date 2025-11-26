import { useEffect, useState } from "react";
import tasksData from "./tasks.json";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) return JSON.parse(saved);
    return tasksData;
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };

    setTasks((prev) => [...prev, task]);
    setNewTask("");
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-root">
      <div className="card">
        <h1>React To-Do List</h1>

        <form onSubmit={handleAddTask} className="form-row">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {tasks.length === 0 ? (
          <p className="empty">
            No tasks found. Add something to get started!
          </p>
        ) : (
          <>
            <div className="task-list">
              {tasks.map((task) => (
                <div key={task.id} className="task-item">
                  <div className="task-left">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                    />
                    <span
                      className={
                        "task-title" +
                        (task.completed ? " completed" : "")
                      }
                    >
                      {task.title}
                    </span>
                  </div>
                  <button
                    className="task-delete"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div className="footer-row">
              <span>
                Total: {tasks.length} | Completed: {completedCount}
              </span>
              <button className="clear-btn" onClick={handleClearAll}>
                Clear all
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
