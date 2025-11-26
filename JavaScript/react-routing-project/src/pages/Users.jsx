import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const getUsers = async() => {
    try{
        setLoading(true)
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        console.log(res)
        if( !res.ok )
            throw new Error(`HTTP ${res.status}`)
        const data = await res.json();
        console.log(data)
        const reqData = data.map(({ id, name, username, email }) => (
            {
                id,
                name,
                username,
                email,
            }))
        console.log(reqData)
        //store reqData into users
        setUsers(reqData);
    }catch(error){
        if( error === "Abort Error")
            return;
        setError(error.message);
    }finally{
        setLoading(false)
    }
  }
  useEffect(()=>{
    getUsers();
  },[])

  if(loading)
    return <p>Loading.....</p>
  if(error)
    return <h2 className='error'>Error - {error}</h2>
  return (
    <div>
      <h1>Users Information</h1>
      <table className='users-table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>USER NAME</th>
                <th>EMAIL</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map((u)=>(
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  )
}

export default Users