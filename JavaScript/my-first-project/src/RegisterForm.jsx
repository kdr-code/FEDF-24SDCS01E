import React, { useState } from 'react'
import "./RegisterForm.css"

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    pwd: ""
  })

  const [users, setUsers] = useState([])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.uname || !formData.email || !formData.pwd) {
      alert("All fields are mandatory!")
      return
    }

    setUsers((prevData) => [...prevData, formData])
    setFormData({ uname: "", email: "", pwd: "" })
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='registration-form'>
        <div className='form-group'>
          <label htmlFor='uname'>User Name:</label>
          <input
            type='text'
            id="uname"
            name="uname"
            value={formData.uname}
            onChange={handleChange}
            placeholder='Enter Username'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter Email'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='pwd'>Password:</label>
          <input
            type='password'
            id="pwd"
            name="pwd"
            value={formData.pwd}
            onChange={handleChange}
            placeholder='Enter Password'
          />
        </div>
        <button type='submit' className='submit-btn'>Register</button>
      </form>

      <div className='registrations'>
        <h2>Registered Users</h2>
        {users.length === 0 ? (
          <p>No users Registered yet!</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.uname} --- {user.email}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default RegisterForm
