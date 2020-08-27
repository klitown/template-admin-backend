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



// Rutas

app.get( '/', ( req, res ) => {
    
    res.json( {

        ok: true,
        msg: 'Peticion GET hecha correctamente',
        codigo: 200,
    })

});





app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', process.env.PORT);
});