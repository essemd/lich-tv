const NodeMediaServer = require('node-media-server');
const mongoose = require('mongoose');
const cron = require('node-cron');
require('dotenv').config({ path: '.env' });
const config = require('./nms-config');
const User = require('./db/model');
const generateStreamThumbnail = require('./helpers/generate-stream-thumbnail');

let nms = new NodeMediaServer(config);
let task = null; // i dont think this is the idiomatic way to declare uninitialized globals in javascript lel

nms.on('prePublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    let streamKey = StreamPath.substring(6); // assuming StreamPath format is consistent

    User.findOne(
    {
        stream_key: streamKey     
    }, 
    function (err, user) {
        if (err) console.log(err);
            console.log('err branch');
        if (!user) {
            console.log('!user branch');
            let session = nms.getSession(id);
            session.reject();
        } else {
            console.log('generateStream branch');
            // uses ffmpeg to extract a frame from the hls transcoding of this live stream
            generateStreamThumbnail(streamKey); // generate a thumbnail as soon as live stream publishing starts
            task = cron.schedule('*/5 * * * * *', () => { // generate a fresh thumbnail every 5 seconds 
                console.log('generating a thumbnail via cron job');
                generateStreamThumbnail(streamKey);
            });
        }
    });
});

nms.on('donePublish', (id, args) => {
    console.log('terminate cron job');
    if (task) task.stop();
});

//mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//nms.run();

module.exports = nms;
