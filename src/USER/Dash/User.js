// import React from 'react'
// import { UseSelector, useSelector } from 'react-redux'

// const User = () => {
//   const { status, user, error } = useSelector((state) => state.user);

//   return (
//     <div>
//      {user && (
//         <div>
//           <p>Welcome, {user.firstname} {user.lastname}!</p>
//           {/* Additional user information display */}
//         </div>
//       )}
//     </div>
//   )
// }

// export default User
// src/components/UserTasks.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../UserSlice';

const User = () => {
  const dispatch = useDispatch();
  const userTasks = useSelector((state) => state.tasks);
  const user=useSelector((state) => state.user);
  const temp=[user]
  const userEmail= temp[0].user?.email;
  const [editingTask, setEditingTask] = useState(null);

  

  useEffect(() => {
    console.log(temp[0],"userEmail")
    const fetchUserTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/${userEmail}/tasks`);
        console.log(response,"response")
        const data = await response.json();
        dispatch(setTasks(data));
      } catch (error) {
        console.error('Error fetching user tasks:', error);
      }
    };

    fetchUserTasks();
  }, [dispatch]);

  const handleEditClick = (task) => {
    setEditingTask(task);
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
        const updatedTasks = userTasks.filter((task) => task._id !== taskId);
        dispatch(setTasks(updatedTasks));
      } else {
        console.error('Error deleting task:', response.status);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCreateClick = () => {
    // Implement your logic for creating a new task
    console.log('Create a new task');
  };

  const handleSaveEditClick = () => {
    // Implement your logic for saving the edited task
    console.log('Save edited task:', editingTask);
    setEditingTask(null); // Clear the editingTask state after saving
  };


  return (
    // <div>
    //   <h1>User Tasks</h1>
    //   <ul>
    //     {console.log(temp[0].Task,"temp")}
    //     {temp[0].Task.map((task) => (
    //       <li key={task?._id}>
    //         <strong>{task?.title}</strong> - {task?.description}
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    <div>
    <h1>User Tasks</h1>
    <button onClick={handleCreateClick}>Create Task</button>
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
            <td>{editingTask === task ? <input value={task.title} /> : task.title}</td>
            <td>{editingTask === task ? <input value={task.description} /> : task.description}</td>
            <td>
              {editingTask === task ? (
                <button onClick={handleSaveEditClick}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleEditClick(task)}>Edit</button>
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
