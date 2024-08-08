import Sequelize from "sequelize";
import db from '../config/db.js';
import { Habitacion } from "./Habitaciones.js";
import { ImagenHtl } from "./ImagenesHotel.js";

export const Hotel = db.define('hoteles', {
    id_htl: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    nombre:{
        type:Sequelize.STRING
    },
    direccion:{
        type:Sequelize.STRING
    },
    telefono:{
        type:Sequelize.STRING
    },
    correo:{
        type:Sequelize.STRING
    }, 
    id_grt: {
        type: Sequelize.INTEGER,
    },
}, {timestamps:false});
Hotel.hasMany (Habitacion,{
    foreignKey:'id_htl'
});
Habitacion.belongsTo(Hotel, {
    foreignKey: {
      name: "id_htl",
    },
});
Hotel.hasMany (ImagenHtl,{
    foreignKey:'id_htl'
});
ImagenHtl.belongsTo(Hotel, {
    foreignKey: {
      name: "id_htl",
    },
});