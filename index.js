require('dotenv').config();
const cors    = require('cors');
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { checkCustomer } = require('./socket-io/socket');

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});
// SOCKET IO
checkCustomer( io );

// CONFIGURAR CORS
app.use( cors({ origin: true, credentials: true }) )

//LECTURA Y PARSEO DEL BODY
app.use(express.json());  

app.use('/', require('./routes/routes'));


server.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});