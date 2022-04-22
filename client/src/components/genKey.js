import React, { useState } from 'react';
import axios from 'axios';
import env from '../env.js';

export default function GenKey(props) {
    const [streamKey, setStreamKey] = useState();

    function handleSubmit(e) {
        e.preventDefault();

        axios.get(`http://${env.HOSTNAME}:${env.NODE_PORT}`, { withCredentials: true})
            .then((res) => {
                //console.log(res);
                setStreamKey(res.data.stream_key);
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-4 container-fluid">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <div className="d-flex justify-content-center">
                            <button className="mb-4 btn btn-warning" type="submit">Generate Key</button>
                        </div>
                        {streamKey && <h5 className="text-center">Your generated stream key (save it somewhere safe):</h5>}
                        <p className="text-center">{streamKey}</p>
                    </div>
                    <div className="col-4"></div>
                </div>
            </div>
        </form>
    );
}
