import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-black text-white p-4 shadow-lg transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold hover:text-gray-300 transition-colors">
          Task Manager
        </Link>
        <div>
          {user ? (
            <button
              onClick={logout}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors">
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
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
