import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TaskFormPage from './pages/TaskFormPage';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages
// const Home = lazy(() => import('./pages/Home'));
// const Login = lazy(() => import('./pages/Login'));
// const Signup = lazy(() => import('./pages/Signup'));
// const TaskFormPage = lazy(() => import('./pages/TaskFormPage'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<FullScreenLoader />}>
        <Navbar />
        <div className="min-h-screen">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/tasks/new"
              element={
                <ProtectedRoute>
                  <TaskFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks/:id/edit"
              element={
                <ProtectedRoute>
                  <TaskFormPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Suspense>
    </Router>
  );
}

// Full-screen loader component
function FullScreenLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">Loading...</h2>
    </div>
  );
}
