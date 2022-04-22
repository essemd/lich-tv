import react, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import env from '../env.js';

export const myContext = createContext({});
export default function Context(props) {
  const [user,setUser] = useState();

  useEffect(() => {
    axios.get(`http://${env.HOSTNAME}:${env.NODE_PORT}/user`, { withCredentials: true }).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <myContext.Provider value={user}>{props.children}</myContext.Provider> // removed ! after user
    );
}
