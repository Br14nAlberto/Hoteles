import { where } from "sequelize";
import { Gerente } from "../models/Gerentes.js";
import { Hotel } from "../models/Hoteles.js";

const guardarGerente = async (req, res) => {
    const { nombre, ap_paterno, ap_materno, telefono } = req.body;
    const errores = [];
    if (nombre.trim() === ""){
        errores.push({mensaje: "El nombre no debe ser vacio" });
    }
    if (ap_paterno.trim() === ""){
        errores.push({mensaje: "El apellido paterno no debe ser vacio" });
    }
    if (ap_materno.trim() === ""){
        errores.push({mensaje: "El apellido materno no debe ser vacio" });
    }
    if (telefono.trim() === ""){
        errores.push({mensaje: "El telefono no debe ser vacio" });
    } else if (telefono.trim().length != 10) {
        errores.push({mensaje: "El telefono debe tener 10 carácteres" });
    }
    if (errores.length>0){
        res.render("gerente", {
            pagina: "Registrar Habitacion",
            errores,
            nombre,
            ap_paterno,
            ap_materno,
            telefono
        });
    } else {
        try {
            await Gerente.create({
                nombre,
                ap_paterno,
                ap_materno,
                telefono
            });
            res.redirect("/listaGerentes");
        } catch (error){
            console.log(error);
        }
    }
};

const eliminarGerente = async (req, res) => {
    const hotel = await Hotel.findAll({where: {id_grt: req.query.id_grt}});
    console.log(hotel[0]);
    try {
        if (hotel[0] != undefined) {
            await Hotel.update({
                id_grt: null
            }, {
                where: {id_htl : hotel[0].id_htl}
            },{
                multi: false
            });   
        }
        await Gerente.destroy( {where: {id_grt : req.query.id_grt}});
        res.redirect("/listaGerentes");
    } catch (error){
        console.log(error);
    }
}

const cambiarGerente = async (req, res) => {
    try {
        const gerente = await Gerente.findByPk(req.query.id_grt);
        const nombre = gerente.nombre;
        const ap_paterno = gerente.ap_paterno;
        const ap_materno = gerente.ap_materno;
        const telefono = gerente.telefono;
        const id_grt = gerente.id_grt;
        res.render("modificarGrt", {
            pagina: "Modificar Gerente",
            id_grt,
            ap_paterno,
            nombre,
            ap_materno,
            telefono
        });
    } catch (error){
        console.log(error);
    }
};

const guardarGerenteM = async (req, res) => {
    const { nombre, ap_paterno, ap_materno, telefono, id } = req.body;
    const errores = [];
    if (nombre.trim() === ""){
        errores.push({mensaje: "El nombre no debe ser vacio" });
    }
    if (ap_paterno.trim() === ""){
        errores.push({mensaje: "El apellido paterno no debe ser vacio" });
    }
    if (ap_materno.trim() === ""){
        errores.push({mensaje: "El apellido materno no debe ser vacio" });
    }
    if (telefono.trim() === ""){
        errores.push({mensaje: "El telefono no debe ser vacio" });
    } else if (telefono.trim().length != 10) {
        errores.push({mensaje: "El telefono debe tener 10 carácteres" });
    }
    if (errores.length>0){
        res.render("modificarGrt", {
            pagina: "Registrar Gerente",
            errores,
            nombre,
            ap_paterno,
            ap_materno,
            telefono,
            id
        });
    } else {
        try {
            await Gerente.update({
                nombre: nombre,
                ap_paterno: ap_paterno,
                ap_materno: ap_materno,
                telefono: telefono,
            }, {
                where: {id_grt : id}
            },{
                multi: false
            });
            res.redirect("/listaGerentes");
        } catch (error) {
            console.log(error);
        }
    }
    
}

export { guardarGerente, eliminarGerente, guardarGerenteM, cambiarGerente }