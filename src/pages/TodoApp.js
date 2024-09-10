import React, { useState, useEffect } from 'react';
import './styles/TodoApp.css';

function TodoApp(
  
) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Load tasks from localStorage when the component is mounted
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleDeleteAllCompleted = () => {
    const updatedTasks = tasks.filter(task => !task.completed);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <div className="main-content">
        <h1>#todo</h1>

        {/* Filter Tabs */}
        <div className="tabs">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => handleFilterChange('active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => handleFilterChange('completed')}
          >
            Completed
          </button>
        </div>

        {/* Add new task */}
        <div className="add-task">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add details"
          />
          <button onClick={handleAddTask}>Add</button>
        </div>

        {/* Todo List */}
        <ul className="task-list">
          {filteredTasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(index)}
                />
                <span>{task.text}</span>
              </label>
              {
                  task.completed && (
                      <span className="delete-icon" onClick={() => handleDeleteTask(index)}>
                          🗑️
                      </span>
                  )
              }
            </li>
          ))}
        </ul>

        {/* Button to delete all completed tasks */}
        {filter === 'completed' && filteredTasks.length > 0 && (
          <div className="delete-all-container">
              <button className="delete-all-btn" onClick={handleDeleteAllCompleted}>
              Delete all
              </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        © Created by Van Hoang- devChallenges.io.
      </div>
    </div>
  );
}

export default TodoApp;
