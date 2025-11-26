import { NavLink } from "react-router-dom"
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
      <nav className="nav">
        <div className="nav-left">
          <NavLink to="/">Home</NavLink> 
          <NavLink to="/about">About</NavLink> 
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/student">Student</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-user">Hello, {user.name}</span>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className="btn">Login</NavLink>
        )}
      </div>
      </nav>
  )
}

export default Navbar
