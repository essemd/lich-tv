import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function StreamLink(props) {
    const [imgSrc, setImg] = useState();

    const imgUrl = 'http://localhost:5000/thumbnails/' + props.streamId + '.png';
    const pathname = 'stream/' + props.streamId;

    const fetchImage = async () => {
        const res = await fetch(imgUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob); // object URL should be freed explicitly

        setImg(imageObjectURL);
    };

    useEffect(() => {
        const interval = setInterval(fetchImage, 5001);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="d-flex justify-content-center">
            <Link to={pathname}><img src={imgSrc} className="m-1 img-fluid img-thumbnail" alt="thumbnail"/></Link> 
        </div>
    );
}
