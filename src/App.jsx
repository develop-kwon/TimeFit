import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ErrorDisplay, useErrorHandler } from './components/ErrorDisplay';
import { SignUpPage } from './pages/auth/SignUpPage';
import './App.css';

// 임시 홈 페이지 컴포넌트 (나중에 실제 페이지로 교체)
function HomePage() {
  return (
    <div>
      <h1>Time-Fit Job Portal</h1>
      <p>환영합니다!</p>
    </div>
  );
}

// 임시 로그인 페이지 컴포넌트 (나중에 실제 페이지로 교체)
function LoginPage() {
  return (
    <div>
      <h1>로그인</h1>
      <p>로그인 페이지 (구현 예정)</p>
    </div>
  );
}

// 보호된 라우트 컴포넌트
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// 에러 핸들러가 포함된 메인 앱 컴포넌트
function AppContent() {
  const { error, clearError } = useErrorHandler();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* 보호된 라우트 예시 (나중에 실제 페이지로 교체) */}
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      {error && <ErrorDisplay error={error} onClose={clearError} />}
    </>
  );
}

// 메인 App 컴포넌트
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
