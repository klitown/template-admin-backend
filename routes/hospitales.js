/* 
   Rutas predeterminada: './routes/hospital'
*/

const { Router } = require('express');
// Validaciones
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos');


// Controlador de respuesta de la peticion
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales');

const router = Router();

// Mostrar usuarios
router.get( '/', getHospitales ); 


// Creacion de nuevo usuario
router.post( '/', 
            [
                validarJWT,
                check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
                validarCampos
            ], 
            crearHospital  ); 



router.put( '/:id', 
            [
            
            ],
            actualizarHospital ); 



router.delete( '/:id', 
                [
                  
                ], 
                borrarHospital )


module.exports = router;