import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Users from './Users';
import Things from './Things';

const App = ()=> {
  const [users, setUsers] = useState([])
  const [things, setThings] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users')
      setUsers(response.data)
    }
    fetchUsers()
  }, [])

  useEffect (() => {
    const fetchThings = async () => {
      const response = await axios.get('/api/things')
      setThings(response.data)
    }
    fetchThings()
  }, [])

  const addOwner = async(thing, user) => {
    const newThing = {...thing, user_id: user.id}
    const response = await axios.put(`/api/things/${thing.id}`, newThing)
    setThings(things.map((_thing) => {return _thing.id === thing.id ? newThing : _thing}))
  }

  const removeOwner = async(thing) => {
    const newThing = {...thing, user_id: null}
    const response = await axios.put(`/api/things/${thing.id}`, newThing)
    setThings(things.map((_thing) => {return _thing.id === thing.id ? newThing : _thing}))
  }

  return (
    <div>
      <h1>Thing Tracker</h1>
      <div>
        <Users users={users} things={things}/>
        <Things things={things} users={users} addOwner={addOwner} removeOwner={removeOwner}/>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<App />);
