// Servidor Express
const express = require('express');

// CORS
const cors = require('cors');


// Variables de entorno
require('dotenv').config();

// Conexion a la base de datos
const { dbConnection } = require('./database/config');

// Servidor Express
const app = express();


// Base de datos
dbConnection();

// Config CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );



// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/upload', require('./routes/uploads') );






app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', process.env.PORT);
});