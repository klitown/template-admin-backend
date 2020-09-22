const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");


const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo de archivo
    const tiposValidos = [ 'hospitales', 'medicos', 'usuarios' ];
    if ( !tiposValidos.includes(tipo) ) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo de archivo no es valido'
        });
    }

    // Validar si existe un archivo seleccionado por el usuario
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha seleccionado ningun archivo'
        });
      }

    // Procesar la imagen...
    const file = req.files.imagen;
    // Divide el nombre del archivo cuando encuentra un punto, lo envia a un arreglo
      // Example: foto.1.12.2020.jpg ['foto', '1', '12', '2020', 'jpg' ]
    const nombreCortado = file.name.split('.');
    // La posicion final del arreglo anterior siempre contendrá el tipo de archivo
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

    // Validar extension del archivo
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'svg'];
    if ( !extensionesValidas.includes ( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No se admiten este tipo de archivos. Intente de nuevo'
        });
    }

    // Generar el nombre del archivo subido
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Actualizar base de datos

    actualizarImagen( tipo, id, nombreArchivo );


    // Mover la imagen al path indicado arriba
    file.mv( path , (err) => {
        if (err) {
            console.log(err);
          return res.status(500).json({
              ok: false,
              msg: 'No se pudo mover la imagen '
          });
        }
        res.json({
            ok: true,
            msg: `Se subió el archivo ${nombreArchivo} a la página`
            });
      });
}


const getImagenes = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto  = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}` );
    res.sendFile(pathImg);

    // Imagen a mostrar por defecto en caso de no existir una imagen en el 'pathImg':
    if ( fs.existsSync(pathImg) ) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    getImagenes
}