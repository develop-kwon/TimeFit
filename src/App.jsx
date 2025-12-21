import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ErrorDisplay, useErrorHandler } from './components/ErrorDisplay';

import Home from './pages/Home';
import Find from './pages/Find';
import SeekerMyPage from './pages/SeekerMyPage';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

import './App.css';

function AppContent() {
  const { error, clearError } = useErrorHandler();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/find" element={<Find />} />
        <Route path="/mypage" element={<SeekerMyPage />} />
        <Route path="/seeker/mypage" element={<SeekerMyPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {error && <ErrorDisplay error={error} onClose={clearError} />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
