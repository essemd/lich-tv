const NodeMediaServer = require('node-media-server');
//const config = require('./config/default').rtmp_server;

const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8000,
        allow_origin: '*'
    }
};

let nms = new NodeMediaServer(config);
nms.run();
