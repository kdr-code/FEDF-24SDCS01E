import { NavLink, Outlet } from 'react-router-dom'

const Student = () => {
  return (
    <div>
        <nav className='student'>
          <NavLink to="profile">Profile</NavLink> 
          <NavLink to="result">Result</NavLink>
          <NavLink to="users">Users</NavLink>
        </nav> 
        <Outlet />
    </div>
  )
}

export default Student
