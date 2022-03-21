const NodeMediaServer = require('node-media-server');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'config.env' });
const config = require('./nms-config');
const User = require('./db/model');

let nms = new NodeMediaServer(config);

nms.on('prePublish', (id, StreamPath, args) => {
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    User.findOne(
    {
        stream_key: StreamPath.substring(6) // assuming StreamPath format is consistent
    }, 
    function (err, user) {
        if (err) console.log(err);
        if (!user) {
            let session = nms.getSession(id);
            session.reject();
        }
    });
});

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

nms.run();
