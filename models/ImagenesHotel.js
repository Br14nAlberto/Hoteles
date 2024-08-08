import Sequelize from "sequelize";
import db from '../config/db.js';

const ImagenHtl = db.define('imagenes_hoteles', {
    id_imagen: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    imagen:{
        type:Sequelize.STRING
    },
    nombre:{
        type:Sequelize.STRING
    },
    id_htl:{
        type:Sequelize.INTEGER
    }
}, {timestamps:false});

export { ImagenHtl }