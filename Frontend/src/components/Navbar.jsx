import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Layout from './Layout';

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
      className={`fixed top-0 left-0 w-full bg-black text-white shadow-lg transition-transform duration-300 z-50 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
      <Layout>
        <div className="flex justify-between items-center py-4">
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
              <div className='space-x-4'>
                <Link
                  to="/login"
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </nav>
  );
}
