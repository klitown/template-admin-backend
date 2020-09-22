const { response } = require('express')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


const validarJWT = ( req, res, next ) => {

    // Se lee el token
    const token = req.header('x-token');
    

    if ( !token ){
        res.status(401).json({
            ok: false,
            msg: 'No se encontró el token en la peticion'
        })

    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        req.uid = uid;
        
        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}