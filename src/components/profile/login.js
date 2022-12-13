import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as service from "../../services/users-service";
import React from "react";
import {UserList} from "./user-list";

export const Login = () => {
  const [loginUser, setLoginUser] = useState({});
  const navigate = useNavigate()
  const login = () =>
    service.login(loginUser)
      .then((user) => navigate('/profile/mytuits'))
      .catch(e => alert(e));
  return (
    <div>
      <h1>Login</h1>
      <input onChange={(e) =>
        setLoginUser({...loginUser,
          username: e.target.value})}/>
      <input onChange={(e) =>
        setLoginUser({...loginUser,
          password: e.target.value})}/>
      <button onClick={login}>
        Login</button>
    </div>
  );

};