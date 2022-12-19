# Lich.tv

Lich.tv is a live-streaming platform built with the MERN stack.

## Local deployment

The first things you need to do are cloning this repository and installing its dependencies:

```
git clone https://github.com/essemd/lich-tv.git

cd lich-tv/client
npm install

cd ../server
npm install
```

Once installed, you'll need to create two configuration files.

Place the following into `lich-tv/server/.env`, appending your MongoDB database URI to the first field:

```
ATLAS_URI=<mongodb_uri>
HOSTNAME=localhost
NODE_PORT=5001
HTTP_PORT=8888
```

Place the following into `lich-tv/client/src/env.js`:

```
const dev = {
    PROTOCOL: 'http',
    HOSTNAME: 'localhost'
}

const prod = {
    PROTOCOL: 'https',
    HOSTNAME: '<prod_url>'
}

module.exports = process.env.REACT_APP_ENV === 'development' ? dev : prod;
```

You'll also need to setup proxy forwarding with a web server to avoid CORS issues when running the React development server on port `3000`. If you are using NGINX, add the following location blocks to your main server block in the NGINX config:      
```
location / {
    proxy_pass http://localhost:3000/;
}

location /node/ {
    proxy_pass http://localhost:5001/;
}

location /hls/ {
    proxy_pass http://localhost:8888/;
}

location /api/streams/ {
    proxy_pass http://localhost:8888/api/streams/;
}
```
Also make sure your web server is running on port `80` on `localhost`. Then reload NGINX.

At this point all you need to do is run `npm start` from both the `client` and `server` folders. Make sure to use the URL `localhost:80` and NOT `localhost:3000` in the browser when visiting the site, otherwise you'll run into the CORS issues previously mentioned.
