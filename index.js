require('dotenv').config();
const cors    = require('cors');
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { dbConnect } = require('./config/db');
const { checkCustomer } = require('./socket-io/socket');

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:4200",
    origin: "https://game-of-the-year.netlify.app",
    methods: ["GET", "POST"]
  }
});
// SOCKET IO
checkCustomer( io );

// CONFIGURAR CORS
app.use( cors());

app.use( express.static('public'))

//LECTURA Y PARSEO DEL BODY
app.use(express.json());

// BASE DE DATOS
dbConnect();

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use('/', require('./routes/routes'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));


server.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
