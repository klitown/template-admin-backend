const { response } = require('express');
 
const Medico = require('../models/medico');

const getMedicos = async ( req, res = response ) => {

    const medicos = await Medico.find()
                                     .populate('usuario', 'nombre')
                                     .populate('hospital', 'nombre')



    res.json({
        ok: true,
        msg: 'Get medicos',
        medicos
    })
}

const crearMedico = async ( req, res = response ) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico: medicoDB
        })
        
    } catch (error) { 
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en la peticion de Medicos'
        });
    }
}

const actualizarMedico = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'Actualizar medico'
    })
}

const borrarMedico = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'Borrar medico'
    })
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}