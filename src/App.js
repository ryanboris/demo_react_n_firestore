import React, { useState, useEffect } from 'react'
import { db } from './index'
import uuidv4 from 'uuid'

const App = () => {
  const [users, setUsers] = useState([])
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [age, setAge] = useState('')

  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot(snapshot => {
      const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setUsers(users)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  async function postUser(e) {
    e.preventDefault()
    const user = db.collection('users').doc()
    await user.set({
      firstName: first,
      lastName: last,
      age,
      timestamp: new Date().toLocaleTimeString()
    })
    setFirst('')
    setLast('')
    setAge('')
  }

  return (
    <div className="App">
      <form onSubmit={postUser}>
        <input
          type="text"
          placeholder="first name"
          value={first}
          onChange={e => setFirst(e.target.value)}
        />
        <input
          type="text"
          placeholder="last name"
          value={last}
          onChange={e => setLast(e.target.value)}
        />
        <input
          type="text"
          placeholder="age"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
      <hr />
      <div>
        {users.map(user => (
          <div key={uuidv4()}>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.age}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
