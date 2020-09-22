const { Schema, model } = require('mongoose');

// Modelo de Usuarios para la BD
const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
    
});

module.exports = model( 'Hospital', HospitalSchema  );