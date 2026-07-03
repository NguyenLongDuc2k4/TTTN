import https from 'https';
import fs from 'fs';

const url = 'https://metik.vn/';

https.get(url, (res) => {
  // Handle redirects if any
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    console.log('Redirecting to:', res.headers.location);
    https.get(res.headers.location, handleResponse);
    return;
  }
  handleResponse(res);
}).on('error', (err) => {
  console.error('Error fetching metik.vn:', err);
});

function handleResponse(res) {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('metik_home.html', data);
    console.log('Saved HTML to metik_home.html. Size:', data.length);
  });
}
