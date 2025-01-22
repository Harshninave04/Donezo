import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000')
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-light">Welcome to Task Manager</h1>
      <p className="mt-4 font-light bg-green-50 p-3 max-w-fit">{message}</p>
    </div>
  );
}
