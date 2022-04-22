const { spawn } = require('child_process');
const config = require('../nms-config');
const cmd = config.trans.ffmpeg;
const path = require('path');
const dotenv = require('dotenv');

const configPath = path.resolve(__dirname, '../../config.env');
dotenv.config({ path: configPath });

const generateStreamThumbnail = (streamKey) => {

    console.log(streamKey);
    const args = [
        '-y',
        '-i', `http://localhost:${process.env.HTTP_PORT}/live/` + streamKey + '/index.m3u8',
        '-ss', '00:00:01',
        '-vframes', '1',
        '-vf', 'scale=-2:300',
        './thumbnails/' + streamKey + '.png',
    ];

    const subprocess = spawn(cmd, args, {
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
