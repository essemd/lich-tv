import react, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const myContext = createContext({});
export default function Context(props) {
  const [user,setUser] = useState();

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_NODE_PORT}/user`, { withCredentials: true }).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <myContext.Provider value={user}>{props.children}</myContext.Provider> // removed ! after user
    );
}
