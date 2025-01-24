import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          Task Manager
        </Link>
        <div>
          {user ? (
            <button onClick={logout} className="bg-white text-black px-4 py-2 rounded">
              Logout
            </button>
          ) : (
            <div className='flex space-x-4'>
              <Link to="/login" className="bg-white text-black px-4 py-2 rounded">
                Login
              </Link>
              <Link to="/signup" className="bg-white text-black px-4 py-2 rounded">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
