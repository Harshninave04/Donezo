import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchTasks } from '../services/taskService';
import TaskCard from '../components/TaskCard';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getTasks();
    }
  }, [user]);

  if (loading) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return (
      <Layout>
        <div className="text-red-500">{error}</div>
      </Layout>
    );
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <Layout>
      <div className="py-28">
        {' '}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-light">Welcome to Task Manager</h1>
          <Link
            to="/tasks/new"
            className="bg-black text-white text-sm md:text-base px-2 py-2 md:px-4 md:py-2 rounded hover:bg-gray-800 transition-colors">
            Create Task
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDeleteTask} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
