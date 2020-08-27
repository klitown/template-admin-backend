// MongoDB validation
const mongoose = require('mongoose');
// Variables de entorno
require('dotenv').config();

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.DB_CNN, 
                            {  
                            useNewUrlParser: true, 
                            useUnifiedTopology: true,
                            useCreateIndex: true  
                            }
                        );

            console.log('La base de datos está ON');
        }


    catch (error) {
        console.log(error);
        throw new Error ('Error al conectar a la base de de datos.');
    }
}

module.exports = {
    dbConnection
}