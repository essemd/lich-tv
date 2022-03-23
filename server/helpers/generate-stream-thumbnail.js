const { spawn } = require('child_process');
const config = require('../nms-config');
const cmd = config.trans.ffmpeg;

const generateStreamThumbnail = (streamKey) => {

    console.log(streamKey);
    const args = [
        '-y',
        '-i', 'http://localhost:8000/live/' + streamKey + '/index.m3u8',
        '-ss', '00:00:01',
        '-vframes', '1',
        '-vf', 'scale=-2:300',
        './thumbnails/' + streamKey + '.png'
    ];

    const subprocess = spawn(cmd, args, {
        detached: true
    });

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
