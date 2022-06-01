const path = require('path');
const dotenv = require('dotenv');
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

const env = process.env.NODE_ENV || 'development';
const configPath = path.resolve(__dirname, env === 'development' ? '.env.development' : '.env');
dotenv.config({ path: configPath });

const config = {
    rtmp: {
        port: process.env.RTMP_PORT,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: process.env.HTTP_PORT,
        mediaroot: './media',
        allow_origin: '*'
    },
    https: {
	port: 8443,
	key: './privatekey.pem',
	cert: './certificate.pem'
    },
    trans: {
        ffmpeg: ffmpegPath,
        tasks: [
            {
              app: 'live',
              hls: true,
              hlsFlags: '' 
            }
        ]
    }
};

module.exports = config;
