import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import flvjs from 'flv.js';

export default function StreamView(props) {
    const { streamId } = useParams();

    const initFlv = ($video) => {
        if ($video) {
            if (flvjs.isSupported()) {
                let flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true,
                    url: 'ws://localhost:8888/live/' + streamId + '.flv'
                });

                flvPlayer.attachMediaElement($video);
                flvPlayer.load();
                flvPlayer.play();
            }
        }
    }
   
    return (
        <video 
            controls
            autoplay
            ref={initFlv}
        />
    );
}
