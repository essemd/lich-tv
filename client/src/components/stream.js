import React from "react";

export default function Stream(props) {
        /*<div class="d-flex justify-content-center">
            <img src="http://127.0.0.1:5000/thumbnails/2mp9M3aOp.png" class="m-1 img-fluid img-thumbnail" alt="thumbnail"> 
        </div>*/

    const imgSrc = 'http://127.0.0.1:5000/thumbnails/' + props.streamId + '.png';

    return (
        <div className="d-flex justify-content-center">
            <img src={imgSrc} className="m-1 img-fluid img-thumbnail" alt="thumbnail"/> 
        </div>
    );
}
