const NodeMediaServer = require('node-media-server');
const config = require('./nms-config');

let nms = new NodeMediaServer(config);
nms.run();
