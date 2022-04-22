import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function StreamLink(props) {
    const [imgSrc, setImg] = useState();

    const imgUrl = 'http://localhost:5001/thumbnails/' + props.streamId + '.png';
    const pathname = 'stream/' + props.streamId;

    const fetchImage = async () => {
        const prevImgSrc = imgSrc;

        const res = await fetch(imgUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob); 

        if (imageObjectURL != prevImgSrc) {
            URL.revokeObjectURL(prevImgSrc); // prevent memory leak
            setImg(imageObjectURL);
        }
    };

    useEffect(() => {
        fetchImage();
        const interval = setInterval(fetchImage, 5001);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="d-flex justify-content-center">
            <Link to={pathname}><img src={imgSrc} className="m-1 img-fluid img-thumbnail" alt="thumbnail"/></Link> 
        </div>
    );
}
