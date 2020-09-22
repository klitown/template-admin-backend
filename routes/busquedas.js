/* 
    Ruta predeterminada: /api/todo/:busqueda
*/
const { Router } = require('express');

const { login } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas')


router.get( '/:busqueda', validarJWT , getTodo);

router.get( '/coleccion/:tabla/:busqueda', validarJWT , getDocumentosColeccion);








module.exports = router;