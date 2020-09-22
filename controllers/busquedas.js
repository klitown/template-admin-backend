const { response } = require('express');


const Usuario = require('../models/usuario');
const Hospitales = require('../models/hospital');
const Medico = require('../models/medico');

const getTodo = async ( req, res = response) => {
    const busqueda = req.params.busqueda;
    // expresion regular para hacer 'insensible' la busqueda del usuario
    ///// no es case-sensitive ni con tipado estricto
    const regexp = new RegExp( busqueda, 'i' );

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regexp }),
        Medico.find({ nombre: regexp }),
        Hospitales.find({ nombre: regexp }),
    ]);

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    });
}
const getDocumentosColeccion = async ( req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regexp = new RegExp( busqueda, 'i' );
    
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regexp })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;

        case 'hospitales':
            data = await Hospitales.find({ nombre: regexp })
                                    .populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regexp });
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'Solo se pueden buscar medicos, hospitales o usuarios'
            });
    }

    res.json({
        ok: true,
        resultado: data
    });


}

module.exports = {
    getTodo,
    getDocumentosColeccion
} 
