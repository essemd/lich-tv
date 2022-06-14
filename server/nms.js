const NodeMediaServer = require('node-media-server');
const cron = require('node-cron');
const path = require('path');
const dotenv = require('dotenv');
const config = require('./nms-config');
const User = require('./db/model');
const generateStreamThumbnail = require('./helpers/generate-stream-thumbnail');

// const env = process.env.NODE_ENV || 'development';
// const configPath = path.resolve(__dirname, env == 'development' ? '.env.development' : '.env');
const configPath = path.resolve(__dirname, '.env');

dotenv.config({ path: configPath });

const nms = new NodeMediaServer(config);
let task = null; // i dont think this is the idiomatic way to declare uninitialized globals in javascript lel

nms.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  const streamKey = StreamPath.substring(6); // assuming StreamPath format is consistent

  User.findOne(
    {
      stream_key: streamKey,
    },
    (err, user) => {
      if (err) console.log(err);
      console.log('err branch');
      if (!user) {
        console.log('!user branch');
        const session = nms.getSession(id);
        session.reject();
      } else {
        console.log('generateStream branch');
        generateStreamThumbnail(streamKey); task = cron.schedule('*/5 * * * * *', () => {
          console.log('generating a thumbnail via cron job');
          generateStreamThumbnail(streamKey);
        });
      }
    },
  );
});

nms.on('donePublish', (id, args) => {
  console.log('terminate cron job');
  if (task) task.stop();
});

module.exports = nms;
