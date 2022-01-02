/**
 * Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 4).
 * We define a route handler / that gets called when we hit our website home.
 * We make the http server listen on port 3000.
 */

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

//Hier wird eine neue Instanz eines Socket.IO Servers erzeugt, die mit dem HTTP Server Objekt verknüpft wird
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  //Hier wird geschaut, ob eine Verbindung zwischen User und Socket besteht
  //Wenn dem so ist, wird eine entsprechende Nachricht in der Konsole/ im Terminal ausgegeben
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
    console.log('a user connected');
    //Event, wenn Verbindung zwischen User und Socket unterbrochen wird
    socket.on('disconnect', () => {
        console.log('user disconnected');
        
      });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});