const { response } = require('express');
 
const Hospital = require('../models/hospital');
 

const getHospitales = async ( req, res = response ) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre')

    res.json({
        ok: true,
        msg: 'Get hospitales',
        hospitales
    })
}

const crearHospital = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'Crear hospital'
    })
}

const actualizarHospital = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'Actualizar hospital'
    })
}

const borrarHospital = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'Borrar hospital'
    })
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}