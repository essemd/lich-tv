import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import flvjs from 'flv.js';
import env from '../env';

export default function StreamView(props) {
  const { streamId } = useParams();

  const initFlv = ($video) => {
    if ($video) {
      if (flvjs.isSupported()) {
        const flvPlayer = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          url: `${env.PROTOCOL}://${env.HOSTNAME}/hls/live/${streamId}.flv`,
        });

        flvPlayer.attachMediaElement($video);
        flvPlayer.load();
        flvPlayer.play();
      }
    }
  };

  return (
  // <div className="content container-fluid mt-4">
    <div className="content embed-responsive embed-responsive-16by10">
      <video
        controls
        autoPlay
        ref={initFlv}
      />
    </div>
  // </div>
  );
}
