import axios, { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import userService from './services/user.service';
import { User } from './dto/user.dto';

function App() {

  const [ user, setUser ] = useState<User>();

  useEffect(() => {
    if(!user){
        userService.getUser().then((res: AxiosResponse) =>{
          setUser(res.data);
        }) 
      }
      if(user){
        axios.get('http://localhost:3000/auth/test', { withCredentials: true}).then((res: AxiosResponse) => {
          console.log(res.data);
        })
      }
  }, [user]) 

  const login = () => {window.location.replace('auth/login')}
  const logout = () => {window.location.replace('auth/logout')}

  return (
    <div >
      {user &&
      <><p className="username"> Hey {user.preferred_username}</p><p className="sub"> sub: {user.sub}</p></> }
      <p className="buttons">
          {!user ? 
          <button color="primary" onClick={login}>Login</button>
          :
          <button color="danger" onClick={logout}>Logout</button>
          }
        </p>
    </div>
  );
}

export default App;
