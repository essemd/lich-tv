const NodeMediaServer = require('node-media-server');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'config.env' });
const config = require('./nms-config');
const User = require('./db/model');
const generateStreamThumbnail = require('./helpers/generate-stream-thumbnail');

let nms = new NodeMediaServer(config);

nms.on('prePublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    let streamKey = StreamPath.substring(6);
    User.findOne(
    {
        stream_key: streamKey // assuming StreamPath format is consistent
    }, 
    function (err, user) {
        if (err) console.log(err);
        if (!user) {
            let session = nms.getSession(id);
            session.reject();
        } else {
            // uses ffmpeg to extract a frame from the hls transcoding of this live stream
            generateStreamThumbnail(streamKey);
        }
    });
});

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

nms.run();
