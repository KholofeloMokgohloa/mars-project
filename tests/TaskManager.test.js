import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskManager from '../src/components/TaskManager';
import App from '../src/App';

describe('TaskManager Component', () => {
  const initialTasks = [
    { title: 'Task 1', description: 'Description 1', creator: 'Creator 1', assignee: 'Assignee 1' },
    { title: 'Task 2', description: 'Description 2', creator: 'Creator 2', assignee: 'Assignee 2' }
  ];
  const user = 'Kholofelo Hope Mokgohloa';

  test('allows users to add a task', () => {
    const addTask = jest.fn();
    render(<TaskManager tasks={[]} addTask={addTask} deleteTask={() => { }} user={user} />);

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByPlaceholderText('Assignee'), { target: { value: 'New Assignee' } });
    fireEvent.click(screen.getByText('Add Task'));

    expect(addTask).toHaveBeenCalledWith({
      title: 'New Task',
      description: 'New Description',
      creator: user,
      assignee: 'New Assignee'
    });
  });

  test('renders tasks and allows task editing', () => {
    const setTasks = jest.fn();
    render(<TaskManager tasks={initialTasks} setTasks={setTasks} deleteTask={() => { }} user={user} />);

    fireEvent.click(screen.getAllByText('Edit')[0]);

    fireEvent.change(screen.getByDisplayValue('Task 1'), { target: { value: 'Edited Task 1' } });
    fireEvent.click(screen.getByText('Save'));

    expect(setTasks).toHaveBeenCalledTimes(1);
  });

  test('allows users to delete a task', () => {
    const deleteTask = jest.fn();
    render(<TaskManager tasks={initialTasks} deleteTask={deleteTask} user={user} />);

    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(deleteTask).toHaveBeenCalledWith(0);
  });

  test('allows users to delete all tasks', async () => {
    render(<App />);
  
    const deleteAllButton = screen.getByRole('button', { name: /delete all tasks/i });
    fireEvent.click(deleteAllButton);
  
    await waitFor(() => {
      expect(screen.queryByTestId('task')).not.toBeInTheDocument();
    });
  });
});