import React, { useState/*, useContext*/ } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
//import { myContext } from './context';


export default function Login(props) {
    const [username, setUsername] = useState(); 
    const [password, setPassword] = useState(); 

    //const ctx = useContext(myContext);

  const login = () => {
    axios.post("http://localhost:5000/login", {
      username,
      password
    }, {
      withCredentials: true
    }).then((res) => {
      if (res.data === "success") {
       window.location.href = "/genkey"
     }
    }, () => {
      console.log("Failure");
    })
  }

    return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder='username' onChange={e => setUsername(e.target.value)}/>
      <input type="text" placeholder='password' onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
    );
}
