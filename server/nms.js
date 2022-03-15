const NodeMediaServer = require('node-media-server');
const config = require('./config');

let nms = new NodeMediaServer(config);
nms.run();
