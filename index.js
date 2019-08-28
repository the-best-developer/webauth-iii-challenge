const express = require('express');
const server = express();

server.use(express.json());
server.get('/', (req, res) => {
  res.send('Server up! :)')
})

server.listen(4000, _ => {
  console.log(`Listening on port 4000!`);
});