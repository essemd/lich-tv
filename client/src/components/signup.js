import React, { useState } from 'react';
import axios from 'axios'; 
import env from '../env.js';

export default function Signup(props) {
    const [username, setUsername] = useState(); 
    const [password, setPassword] = useState(); 
    const [failed, setFailed] = useState(false);

      const signup = () => {
        axios.post(`http://${env.HOSTNAME}:${env.NODE_PORT}/signup`, {
          username,
          password
        }, {
          withCredentials: true
        })
        .then((res) => {
          if (res.data === 'success') {
	      console.log('success');
              window.location.href = '/login'
          } else if (res.data === 'exists') {
	      console.log('exists');
              setFailed(true); 
          } else {
	      console.log('server error');
              window.alert('server error'); // temp 
          }
        })
        .catch((err) => {
          console.log(err);
        });
      };

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
          {failed && <h6 className="mt-5 text-danger">Username already exists.</h6>}
        </div>
        <div className="col-4"></div>
        </div>
    </div>
    );
}
