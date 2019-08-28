const express = require('express');
const server = express();
const UserRoutes = require('./routes/userRoutes.js');

server.use(express.json());

server.use('/', UserRoutes);

server.listen(4000, _ => {
  console.log(`Listening on port 4000!`);
});