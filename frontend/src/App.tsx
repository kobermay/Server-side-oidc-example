import axios, { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import userService from './services/user.service';
import { User } from './dto/user.dto';

function App() {

  const [ user, setUser ] = useState<User>();
  const [ test, setTest ] = useState();

  useEffect(() => {
    if(!user){
        userService.getUser().then((res: AxiosResponse) =>{
          setUser(res.data);
        }) 
      }
      if(!test && user){
        axios.get('http://localhost:3000/auth/test', { withCredentials: true}).then((res: AxiosResponse) => {
          setTest(res.data);
          console.log(test);
        })
      }
  }, [])

  const login = () => {window.location.replace('auth/login')}
  const logout = () => {window.location.replace('auth/logout')}


  return (
    <div >
      {user && user.userinfo && 
      <p className="username"> Hey {user.userinfo.name}</p>}
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
