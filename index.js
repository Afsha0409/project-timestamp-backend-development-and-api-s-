const express = require('express');
const cors = require('cors');
const requestIp = require('request-ip');

const app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Middleware to handle static files
app.use(express.static('public'));

// Middleware to get the client's IP address
app.use(requestIp.mw());

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to return client's IP address, language, and software
app.get('/api/whoami', (req, res) => {
  const ipaddress = req.clientIp;
  const language = req.get('Accept-Language');
  const software = req.get('User-Agent');

  res.json({
    ipaddress,
    language,
    software
  });
});

// Listen on the port specified by the environment or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
