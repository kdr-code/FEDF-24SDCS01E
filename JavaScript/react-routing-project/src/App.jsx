import { Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Navbar from "./pages/Navbar"
import Student from "./pages/Student"
import Profile from "./pages/Profile"
import Result from "./pages/Result"
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Users from './pages/Users'
import { useAuth } from './contexts/AuthContext'

function RequireAuth({ children }) {
  const { user } = useAuth()
  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/student" element={<Student />}>
          <Route path="profile" element={<Profile />} />
          <Route path="result" element={<Result />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
    </div>
  )
}

export default App
