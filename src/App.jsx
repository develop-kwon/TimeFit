import './App.css';
import Home from './pages/Home';
import Find from './pages/Find.jsx';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import Tasks from './pages/Tasks.jsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>    {/* Routes 컴포넌트 안에는 Route 컴포넌트만 들어갈 수 있다. */}
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/find" element={<Find />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;