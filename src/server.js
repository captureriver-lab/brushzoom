import express from 'express';
import Html from './html';
import fs from 'fs';

require("babel-core/register");

const server = express()
server.use('/dist', express.static('dist'))
server.get('/', (req, res) => {
      res.send(Html)
})

server.get('/motionstats', (req, res) => {
  const rawdata = fs.readFileSync('es.json');
  res.send(rawdata);
})

server.listen(3000, () => console.log("server is running on port 3000"))

module.exports = server
