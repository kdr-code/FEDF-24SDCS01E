import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()


    const from = location.state?.from?.pathname || '/dashboard'


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        const res = login({ username, password })
        if (res.ok) {
            navigate(from, { replace: true })
        } else {
            setError(res.error || 'Login failed')
        }
    }


    return (
        <div className="auth-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="form">
                <label>
                    Username
                    <input value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                {error && <div className="error">{error}</div>}
                <button className="btn" type="submit">Sign in</button>
            </form>
        </div>
    )

}

export default Login
