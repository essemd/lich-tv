import React from "react";
import { Link } from "react-router-dom";

export default function StreamLink(props) {
    const imgSrc = 'http://localhost:5000/thumbnails/' + props.streamId + '.png';
    const pathname = 'stream/' + props.streamId;

    return (
        <div className="d-flex justify-content-center">
            <Link to={pathname}><img src={imgSrc} className="m-1 img-fluid img-thumbnail" alt="thumbnail"/></Link> 
        </div>
    );
}
