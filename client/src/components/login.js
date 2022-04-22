import React, { useState/*, useContext*/ } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
//import { myContext } from './context';


export default function Login(props) {
    const [username, setUsername] = useState(); 
    const [password, setPassword] = useState(); 
    const [failed, setFailed] = useState(false);

    //const ctx = useContext(myContext);

  const login = () => {
    axios.post(`http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_NODE_PORT}/login`, {
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
        setFailed(true);
    })
  }

    /* why did the passport session not work when this was a form? */
    return (
    <div className="mt-4 container-fluid">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <h2 className="mb-4">Login</h2>
          <label className="mr-2" htmlFor="username">Username</label>
          <input className="mb-3 form-control" type="text" onChange={e => setUsername(e.target.value)}/>
          <label className="mr-2" htmlFor="password">Password</label>
          <input className="mb-3 form-control" type="text" onChange={e => setPassword(e.target.value)} />
          <button className="mt-3 btn btn-primary" onClick={login}>Login</button>
          {failed && <h6 className="mt-5 text-danger">Log in failed, try again.</h6>}
        </div>
        <div className="col-4"></div>
        </div>
    </div>
    );
}
