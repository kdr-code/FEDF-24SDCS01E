import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
    const { user, token } = useAuth()
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome <strong>{user?.name}</strong> — this page is protected.</p>
            <div className="card">
                <h3>Your token is</h3>
                <pre>{token}</pre>
            </div>
        </div>
    )
}

export default Dashboard
