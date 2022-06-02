const { spawn } = require('child_process');
const config = require('../nms-config');
const path = require('path');
const dotenv = require('dotenv');

//const env = process.env.NODE_ENV || 'development';
//const configPath = path.resolve(__dirname, env === 'development' ? '../.env.development' : '../.env');
const configPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: configPath });

const generateStreamThumbnail = (streamKey) => {

    console.log(streamKey);
    const args = [
        '-y',
        '-i', `http://${process.env.HOSTNAME}:${process.env.HTTP_PORT}/live/` + streamKey + '/index.m3u8',
        '-ss', '00:00:01',
        '-vframes', '1',
        '-vf', 'scale=-2:300',
        './thumbnails/' + streamKey + '.png',
    ];

    const subprocess = spawn(config.trans.ffmpeg, args, {
        detached: true
    });

    subprocess.unref();

    // debugging
    subprocess.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    // debugging
    subprocess.stderr.on('data', (data) => {
        console.log(data.toString());
    });
};

module.exports = generateStreamThumbnail;
