const path = require('path');
const dotenv = require('dotenv');

const configPath = path.resolve(__dirname, '../config.env');
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
    trans: {
        ffmpeg: '/opt/homebrew/bin/ffmpeg',
        tasks: [
            {
              app: 'live',
              hls: true,
              //hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]', // maybe try getting rid of these? or changing their values.
              hlsFlags: '', // maybe try getting rid of these? or changing their values.
              //dash: true,
              //dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
            }
        ]
    }
};

module.exports = config;
