import React, { useState } from 'react';
import axios from 'axios'; 

export default function Signup(props) {
    const [username, setUsername] = useState(); 
    const [password, setPassword] = useState(); 

      const signup = () => {
        axios.post("http://localhost:5000/signup", {
          username,
          password
        }, {
          withCredentials: true
        }).then((res) => {
          if (res.data === "success") {
           window.location.href = "/login"
         }
        }, () => {
            console.log("Failure");
        })
      }

    return (
    <div className="mt-4 container-fluid">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <h2 className="mb-4">Signup</h2>
          <label className="mr-2" htmlFor="username">Username</label>
          <input className="mb-3 form-control" type="text" onChange={e => setUsername(e.target.value)}/>
          <label className="mr-2" htmlFor="password">Password</label>
          <input className="mb-3 form-control" type="text" onChange={e => setPassword(e.target.value)} />
          <button className="mt-3 btn btn-primary" onClick={signup}>Signup</button>
        </div>
        <div className="col-4"></div>
        </div>
    </div>
    );
}