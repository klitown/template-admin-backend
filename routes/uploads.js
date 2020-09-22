/* 
    Ruta predeterminada: /api/uploads/
*/
const { Router } = require('express');
// Validacion de archivo por express-file-upload
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, getImagenes } = require('../controllers/uploads');

const router = Router();
router.use( expressFileUpload() );

router.put( '/:tipo/:id', validarJWT , fileUpload );

router.get( '/:tipo/:foto', getImagenes );










module.exports = router;