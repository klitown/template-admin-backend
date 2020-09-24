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

const actualizarMedico = async ( req, res = response ) => {
        // Id del hospital a actualizar
        const medicoID = req.params.id;
        // Id del usuario que quiere actualizar
        const uid = req.uid;
    
        try {
    
            const medicoDB = await Medico.findById(medicoID);
            if ( !medicoDB ) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Medico no encontrado'
                });
            }
    
            const cambiosMedico = {
                ...req.body,
                usuario: uid
            }
    
                        // new: true => regresa el registro actualizado
            const medicoActualizado = await Medico.findByIdAndUpdate( medicoID, cambiosMedico, { new: true } );
    
            res.json({
                ok: true,
                medico: medicoActualizado
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error al actualizar el medico.'
            });
        }
}

const borrarMedico = async ( req, res = response ) => {
            // Id del hospital a actualizar
            const medicoID = req.params.id;
  
            try {
        
                const medicoDB = await Medico.findById(medicoID);
                if ( !medicoDB ) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Medico no encontrado'
                    });
                }

                await Medico.findByIdAndDelete( medicoID );

                res.json({
                    ok: true,
                    msg: 'El medico fue borrado correctamente'
                });
    
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    ok: false,
                    msg: 'Error al borrar el medico.'
                });
            }
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}