const https = require('https');

https.get('https://loremflickr.com/900/1200/paris,landmark/all', (res) => {
  console.log('Flickr Status:', res.statusCode);
  console.log('Location header:', res.headers.location);
}).on('error', (e) => {
  console.error(e);
});
