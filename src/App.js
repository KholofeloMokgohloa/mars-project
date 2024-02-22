import React, { useState, useEffect } from 'react';
import './style.css';
import TaskManager from './components/TaskManager';

const App = () => {
  const [marsImage, setMarsImage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState('Kholofelo Hope Mokgohloa');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://source.unsplash.com/random/800x600/?mars');
        const imageUrl = response.url;
        setMarsImage(imageUrl);
      } catch (error) {
        console.error("Couldn't fetch Mars image", error);
      }
    };

    fetchData();
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Mission Tracking For Mars Tasks</h1>
      </div>
      <div className="content">
        {marsImage && <img src={marsImage} alt="Mars" className="mars-image" />}
        <div className="task-manager">
          <TaskManager
            tasks={tasks}
            setTasks={setTasks}
            addTask={addTask}
            deleteTask={deleteTask}
            user={user}
          />
        </div>
        <aside className="side-panel">
          <p>Current user: {user}</p>
          <p>Current tasks: {tasks.length}</p>
          <button onClick={deleteAllTasks}>Delete All Tasks</button>
        </aside>
      </div>
    </div>
  );
};

export default App;
