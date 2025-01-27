import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createTask, updateTask } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import Layout from '../components/Layout';

export default function TaskFormPage() {
  const { id } = useParams(); // Get the task ID from the URL (if editing)
  const { user } = useAuth(); // Get the authenticated user
  const navigate = useNavigate(); // For navigation
  const [error, setError] = useState(''); // For error handling

  // Handle form submission
  const handleSubmit = async (task) => {
    try {
      if (id) {
        // If editing, update the task
        await updateTask(id, task);
      } else {
        // If creating, add a new task
        await createTask(task);
      }
      navigate('/'); // Redirect to the homepage after saving
    } catch (err) {
      setError(err.message); // Display error message
    }
  };

  return (
    <Layout>
      <div className="py-28">
        <h1 className="text-4xl font-medium mb-6">{id ? 'Edit Task' : 'Create Task'}</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        {/* Render the TaskForm component */}
        <TaskForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
}
