
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../UserSlice';
import TaskModal from './TaskModal';

const User = () => {
  const dispatch = useDispatch();
  const userTasks = useSelector((state) => state.tasks);
  const user = useSelector((state) => state.user);
  const temp = [user];
  const userEmail = temp[0].user?.email;
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskData, setEditedTaskData] = useState({ title: '', description: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/${userEmail}/tasks`);
        const data = await response.json();
        dispatch(setTasks(data));
      } catch (error) {
        console.error('Error fetching user tasks:', error);
      }
    };

    fetchUserTasks();
  }, [dispatch, userEmail]);

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditedTaskData({ title: task.title, description: task.description });
  };

  const handleSaveEditClick = async (taskId, updatedTaskData) => {
    // Implement your logic for saving the edited task
    console.log('Save edited task:', taskId);
    try {
      const response = await fetch(`http://localhost:3001/user/${userEmail}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTaskData),
      });

      if (response.ok) {
        // Assuming the response includes the updated task data
        const updatedTask = await response.json();

        // Update the task in the Redux store or state
        const updatedTasks = temp[0].Task.map((task) =>
          task._id === taskId ? updatedTask : task
        );

        dispatch(setTasks(updatedTasks));

        // Clear editing state
        setEditingTask(null);
        setEditedTaskData({ title: '', description: '' });
      } else {
        console.error('Error updating task:', response.status);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDeleteClick = async (taskId) => {
    console.log('Delete task with ID:', taskId);
    try {
      const response = await fetch(`http://localhost:3001/user/${userEmail}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const updatedTasks = temp[0].Task.filter((task) => task._id !== taskId);
        dispatch(setTasks(updatedTasks));
      } else {
        console.error('Error deleting task:', response.status);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCreateTask = async (newTaskData) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userEmail}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskData),
      });

      if (response.ok) {
        const createdTask = await response.json();
        const updatedTasks = [...temp[0].Task, createdTask];
        dispatch(setTasks(updatedTasks));
      } else {
        console.error('Error creating task:', response.status);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };


  return (
    <div>
    <h1>User Tasks</h1>
    <button onClick={handleCreateClick}>Create Task</button>
    <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} onCreateTask={handleCreateTask} />
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {temp[0].Task.map((task) => (
          <tr key={task._id}>
            <td>
              {editingTask === task ? (
                <input
                  name="title"
                  value={editedTaskData.title}
                  onChange={handleInputChange}
                />
              ) : (
                task.title
              )}
            </td>
            <td>
              {editingTask === task ? (
                <input
                  name="description"
                  value={editedTaskData.description}
                  onChange={handleInputChange}
                />
              ) : (
                task.description
              )}
            </td>
            <td>
              {editingTask === task ? (
                <button onClick={() => handleSaveEditClick(task._id, editedTaskData)}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleEditClick(task)}>Edit</button>
                  &nbsp;    &nbsp;   
                  <button onClick={() => handleDeleteClick(task._id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  );
};

export default User;
