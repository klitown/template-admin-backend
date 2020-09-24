
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) => {


    const { email, password } = req.body;

    try {

        // Verificar email
        const usuarioDB = await Usuario.findOne( { email } );
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }


        // Verificar password
        const validPassword = bcryptjs.compareSync( password, usuarioDB.password );
        
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password invalida'
            });
        }

        // General el token - Json Web Token
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const googleSignIn = async ( req, res = response ) => {

    const googleToken = req.body.token;

    try {

        // Verificar el token que recibimos del body
        const { name, email, picture } = await googleVerify( googleToken );
        

        const usuarioDB = await Usuario.findOne({email});
        let usuario;
        // Si no existe un usuario en la base de datos =>
        if ( !usuarioDB ) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '1',
                img: picture,
                google: true
            });
        } else {
            // Si existe usuario =>
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '1';
        }

        await usuario.save();
         
        // General el token - Json Web Token
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            token
        });
                
        res.json({
            ok: true,
            msg: 'Google SignIn',
            name, email, picture
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token de Google Invalido'
        });
    }
    


}

const renewToken = async ( req, res = response ) => {

    const uid = req.uid;

    // General el token - Json Web Token
    const token = await generarJWT( uid );

    res.json({
        ok: true,
        token

    })

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}