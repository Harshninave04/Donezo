import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchTasks } from '../services/taskService';
import TaskCard from '../components/TaskCard';
import Layout from '../components/Layout';

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

  return (
    <Layout>
      <div className="pt-20">
        {' '}
        <h1 className="text-4xl font-medium mb-6 mt-5">Welcome to Task Manager!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
