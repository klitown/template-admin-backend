/* 
    Ruta predeterminada: /api/usuarios
*/

const { Router } = require('express');
// Validaciones
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos');


// Controlador de respuesta de la peticion
const { getUsuarios, postUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Mostrar usuarios
router.get( '/', [ validarJWT ], getUsuarios ); 


// Creacion de nuevo usuario
router.post( '/', 
            [
                check('nombre', 'El nombre es obligatorio').not().notEmpty(),
                check('password', 'El password es obligatorio').not().notEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                validarCampos
            ], 
            postUsuarios  ); 



router.put( '/:id', 
            [
            validarJWT,
            check('nombre', 'El nombre es obligatorio').not().notEmpty(),
            check('email', 'El email es obligatorio').isEmail(),
            check('role', 'El rol es obligatorio'),
            validarCampos,
            ],
            actualizarUsuario ); 



router.delete( '/:id', 
                [
                    validarJWT
                ], 
                borrarUsuario )


module.exports = router;