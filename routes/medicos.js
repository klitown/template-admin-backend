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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');

const router = Router();

// Mostrar medicos
router.get( '/', getMedicos ); 


// Creacion de nuevo medico
router.post( '/', 
            [
                validarJWT,
                check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
                check('hospital', 'El ID del hospital debe ser valido').isMongoId(),
                validarCampos
            ], 
            crearMedico  ); 



router.put( '/:id', 
            [
            
            ],
            actualizarMedico ); 



router.delete( '/:id', 
                [
                  
                ], 
                borrarMedico )


module.exports = router;