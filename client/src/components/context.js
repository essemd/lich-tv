import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import env from '../env';

export const myContext = createContext({});
export default function Context(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`${env.PROTOCOL}://${env.HOSTNAME}/node/user`, { withCredentials: true }).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
                <myContext.Provider value={user}>{props.children}</myContext.Provider> // removed ! after user
  );
}
