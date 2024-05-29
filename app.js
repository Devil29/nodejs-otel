require("./otel1")
const express = require('express');

const PORT = parseInt(process.env.PORT || '8010');
const app = express();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get('/rolldice', (req, res) => {
  console.log(`Listening API hit /rolldice `);
  res.send(getRandomNumber(1, 6).toString());
});


app.get('/getHappy', (req, res) => {
  console.log(`Listening API hit /getHappy `);
  res.send(getRandomNumber(1, 6).toString());
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});