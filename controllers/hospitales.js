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

const actualizarHospital = async ( req, res = response ) => {

    // Id del hospital a actualizar
    const hospitalId = req.params.id;
    // Id del usuario que quiere actualizar
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById(hospitalId);
        if ( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

                    // new: true => regresa el registro actualizado
        const hospitalActualizado = await Hospital.findByIdAndUpdate( hospitalId, cambiosHospital, { new: true } );

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el hospital'
        });
    }
}

const borrarHospital = async ( req, res = response ) => {

   // Id del hospital a actualizar
   const hospitalId = req.params.id;

   try {

       const hospitalDB = await Hospital.findById(hospitalId);
       if ( !hospitalDB ) {
           return res.status(404).json({
               ok: false,
               msg: 'Hospital no encontrado'
           });
       }

       await Hospital.findByIdAndDelete(hospitalId);

       res.json({
           ok: true,
           msg: 'Hospital borrado correctamente'
       });
   } catch (error) {
       console.log(error);
       res.status(500).json({
           ok: false,
           msg: 'Error al actualizar el hospital'
       });
   }
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}