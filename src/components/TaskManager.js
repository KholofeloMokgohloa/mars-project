import React, { useState } from 'react';

const TaskManager = ({ addTask, tasks, setTasks, deleteTask, user }) => {
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAssignee, setEditAssignee] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      addTask({
        title: newTask,
        description: newDescription,
        creator: user,
        assignee: newAssignee
      });
      setNewTask('');
      setNewDescription('');
      setNewAssignee('');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(tasks[index].title);
    setEditDescription(tasks[index].description);
    setEditAssignee(tasks[index].assignee);
  };

  const saveEdit = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          title: editTitle,
          description: editDescription,
          assignee: editAssignee
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditTitle('');
    setEditDescription('');
    setEditAssignee('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="newTaskInput">Title</label>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Title"
                  id="newTaskInput"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Description"
                  id="newDescriptionInput"
                />
              </td>
              <td>{user}</td>
              <td>
                <input
                  type="text"
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  placeholder="Assignee"
                  id="newAssigneeInput"
                />
              </td>
              <td>
                <button type="submit">Add Task</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Creator</th>
            <th>Assignee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              {editIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      id={`editTitleInput_${index}`}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Description"
                      id={`editDescriptionInput_${index}`}
                    />
                  </td>
                  <td>{user}</td>
                  <td>
                    <input
                      type="text"
                      value={editAssignee}
                      onChange={(e) => setEditAssignee(e.target.value)}
                      placeholder="Assignee"
                      id={`editAssigneeInput_${index}`}
                    />
                  </td>
                  <td>
                    <button onClick={() => saveEdit(index)}>Save</button>
                    <button onClick={() => setEditIndex(-1)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.creator}</td>
                  <td>{task.assignee}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => deleteTask(index)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManager;
