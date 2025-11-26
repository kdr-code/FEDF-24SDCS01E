import React, { createContext, useContext, useState, useEffect } from 'react'
/*
- AuthContext stores a simple fake token & user in localStorage
     under key 'auth'.
- Protected routes use the RequireAuth wrapper to redirect unauthenticated 
    users to /login.
- After login the user is redirected to the protected page they originally 
   tried to access.
*/
// Create the context
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)


    // Initialize from localStorage
    useEffect(() => {
        const raw = localStorage.getItem('auth')
        if (raw) {
            try {
                const parsed = JSON.parse(raw)
                setUser(parsed.user)
                setToken(parsed.token)
            } catch (err) {
                console.error('Failed to parse auth from localStorage', err)
            }
        }
    }, [])

    const login = ({ username, password }) => {
        // Demo fake authentication.
        // Replace this with real API call (fetch/axios) and store real token.
        if (username === 'admin' && password === 'admin') {
            const fakeToken = 'token-demo-123'
            const userObj = { name: 'Admin User', username: 'admin' }
            setUser(userObj)
            setToken(fakeToken)
            localStorage.setItem('auth', JSON.stringify({ user: userObj, token: fakeToken }))
            return { ok: true }
        }

        return { ok: false, error: 'Invalid credentials' }
    }


    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('auth')
    }


    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    return useContext(AuthContext)
}