/* 
    Ruta predeterminada: /api/usuarios
*/

const { response }  = require('express');

// Encriptaciones
const bcryptjs = require('bcryptjs');


// Modelo de usuario
const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/jwt');


// Controladores para las peticiones de Usuarios
const getUsuarios = async ( req, res ) => {

    // Paginacion de la respuesta
    const desde = Number (req.query.desde) || 0;

    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),

        Usuario.countDocuments()
    ]);
    
    res.json( {
        ok: true,
        codigo: 200,
        msg: 'Petición GET Usuarios hecha correctamente',
        total,
        usuarios

    });
}

const postUsuarios = async ( req, res = response ) => {

    const { nombre, email, password } = req.body;

    try {

        const emailExist = await Usuario.findOne({ email });

        if ( emailExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado'
            })
        }


        const usuario = new Usuario( req.body );

        // Encriptacion de password
            // Salt: data de manera aleatoria
            const salt = bcryptjs.genSaltSync();
            // Hash que 'matchea' con el password del usuario
            usuario.password = bcryptjs.hashSync( password, salt );

        // Guardar el usuario
        await usuario.save();



        const token = await generarJWT( usuario.id );
    
        res.json( {
            ok: true,
            codigo: 200,
            usuario,
            token
            
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
                ok: false,
                msg: 'Error inesperado. Intente de nuevo'
        })
    }

}

const actualizarUsuario = async ( req, res = response ) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );
        

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        // Si llega a este punto es porque existe un usuario en la BD
        const {password, google, email, ...campos} = req.body;

        if ( usuarioDB.email !== email )  {
            const existeEmail = await Usuario.findOne( {email} );
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findOneAndUpdate( uid, campos, {new:true} );


        res.json({
            ok: true,
            msg: 'El usuario se ha actualizado',
            usuario: usuarioActualizado
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en Actualizar Usuario'
        });
    }

} 



const borrarUsuario = async ( req, res = response ) => {

    const uid = req.params.id;

    try {
        // Verifica si existe un usuario
        const usuarioDB = await Usuario.findById( uid );
        

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario borrado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error al borrar el usuario'
        })
    }

}





module.exports = {
    getUsuarios,
    postUsuarios,
    actualizarUsuario,
    borrarUsuario
}