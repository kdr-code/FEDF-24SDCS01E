const Sample = () => {
  //Array, Object
  //1) map
  //2) filter
  //3) callback functions
  //4) arrow functions
  //5) spread operator
  //6) promices
  //Object:
  let student = [
    {
    sid : 1001,
    sname : "Raja",
    age : 23
    },
    {
    sid : 1002,
    sname : "Rajani",
    age : 24
    }
  ]
  return (
    <div>
      <h2>Student Data:</h2>
      <table>
        <thead>
        <tr>
          <th>SID</th>
          <th>SNAME</th>
          <th>AGE</th>
        </tr>
        </thead>
        <tbody>
        {
          student.map((s)=> <tr key={s.sid}>
            <td>{s.sid}</td>
            <td>{s.sname}</td>
            <td>{s.age}</td>
          </tr>)
        }
        </tbody>
      </table>
    </div>
  )
}

export default Sample