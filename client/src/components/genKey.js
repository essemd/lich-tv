import React, { useState } from 'react';
import axios from 'axios';
import env from '../env';

export default function GenKey(props) {
  const [streamKey, setStreamKey] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    axios.get(`${env.PROTOCOL}://${env.HOSTNAME}/node/genkey`, { withCredentials: true })
      .then((res) => {
        setStreamKey(res.data.stream_key);
      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="content mt-4 container-fluid">
        <div className="row">
          <div className="col-4" />
          <div className="col-4">
            <div className="d-flex justify-content-center">
              <button className="mb-4 btn btn-warning" type="submit">Generate Key</button>
            </div>
            {streamKey && <h5 className="text-center">To stream, use streaming software such as OBS, and point it to the server at rtmp://lich.stream/live, using the generated stream key below:</h5>}
            <p className="text-center">{streamKey}</p>
          </div>
          <div className="col-4" />
        </div>
      </div>
    </form>
  );
}
