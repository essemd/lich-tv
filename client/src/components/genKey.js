import React from 'react';
import axios from 'axios';

export default function GenKey(props) {
    function handleSubmit(e) {
        e.preventDefault();

        axios.get("http://localhost:5000/genkey", { withCredentials: true})
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button type="submit">Generate Key</button>
            </div>
        </form>
    );
}
