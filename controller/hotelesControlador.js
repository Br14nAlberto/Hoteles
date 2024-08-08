import { Hotel } from "../models/Hoteles.js";
import { Habitacion } from "../models/Habitaciones.js";
import { Gerente } from "../models/Gerentes.js";

const guardarHotel = async (req, res) => {
    const {nombre, direccion, telefono,correo} = req.body;
    const errores = [];
    if (nombre.trim() === ""){
        errores.push({mensaje: "El nombre del hotel no debe ser vacio" });
    }
    if (direccion.trim() === ""){
        errores.push({mensaje: "La direccion no debe ser vacia" });
    }
    if (telefono.trim() === ""){
        errores.push({mensaje: "El telefono del hotel no debe ser vacio" });
    } else if (telefono.trim().length != 10) {
        errores.push({mensaje: "El telefono debe tener 10 carácteres" });
    }
    if (correo.trim() === ""){
        errores.push({mensaje: "El correo del hotel no debe ser vacio" });
    }
    if (errores.length>0){
        res.render("hotel", {
            pagina: "Registrar Hotel",
            errores,
            nombre,
            direccion,
            telefono,
            correo
        });
    } else {
        try {
            await Hotel.create({
                nombre,
                direccion,
                telefono,
                correo
            });
            res.redirect('/listaHoteles');
        } catch (error){
            console.log(error);
        }
    }
};

const cambiarHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByPk(req.query.id_htl);
        res.render("modificarHotel", {
            pagina: "Modificar Hotel",
            nombre: hotel.nombre,
            direccion: hotel.direccion,
            telefono: hotel.telefono,
            correo: hotel.correo,
            id: req.query.id_htl
        });
    } catch (error){
        console.log(error);
    }
}

const guardarHtlM = async (req, res) => {
    const {nombre, direccion, telefono, correo, id} = req.body;
    const errores = [];
    if (nombre.trim() === ""){
        errores.push({mensaje: "El nombre del hotel no debe ser vacio" });
    }
    if (direccion.trim() === ""){
        errores.push({mensaje: "La direccion no debe ser vacia" });
    }
    if (telefono.trim() === ""){
        errores.push({mensaje: "El telefono del hotel no debe ser vacio" });
    } else if (telefono.trim().length != 10) {
        errores.push({mensaje: "El telefono debe tener 10 carácteres" });
    }
    if (correo.trim() === ""){
        errores.push({mensaje: "El correo del hotel no debe ser vacio" });
    }
    if (errores.length>0){
        res.render("modificarHotel", {
            pagina: "Modificar Hotel",
            errores,
            nombre,
            direccion,
            telefono,
            correo,
            id
        });
    } else {
        try {
            await Hotel.update({
                nombre: nombre,
                direccion: direccion,
                telefono: telefono,
                correo: correo
            }, {
                where : {
                    id_htl : id
                }
            }, {
                multi: false
            }
            );
            res.redirect("/listaHoteles");
        } catch (error){
            console.log(error);
        }
    }
}

const borrarHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByPk(req.query.id_htl);
        await Habitacion.destroy({where: {id_htl : req.query.id_htl}});
        await Hotel.destroy({where: {id_htl : req.query.id_htl}});
        await Gerente.destroy({where: {id_grt : hotel.id_grt}});
        res.redirect('/listaHoteles');
    } catch (error){
        console.log(error);
    }
}

const eliminarAsignacionGerente = async (req, res) => {
    try {
        await Hotel.update({
            id_grt: null
        }, {
            where : {
                id_htl : req.query.id
            }
        }, {
            multi: false
        }
        );
        res.redirect("/listaHoteles");
    } catch (error){
        console.log(error);
    }
}

const asignarGerente =  async (req, res) => {
    const {gerente, id_hotel} = req.body;
    const hoteles = await Hotel.findAll({
        attributes: ['id_htl', 'nombre', 'direccion', 'telefono', 'correo', 'id_grt']
    });
    const gerentes = await Gerente.findAll({
        attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono']
    });
    const errores = [];
    try {
        const hotel = await Hotel.findAll({where: {id_grt: gerente}});
        if (hotel[0] == undefined) {
            console.log("entra")
            await Hotel.update({
                id_grt: gerente
            }, {
                where : {
                    id_htl : id_hotel
                }
            }, {
                multi: false
            }
            );
            res.redirect("/listaHoteles");
        } else {
            errores.push({mensaje: "El gerente ya se encuentra en otro hotel" });
            res.render("listaHoteles",{
                pagina: "Lista Hoteles",
                hoteles,
                gerentes,
                errores
            });
        }
    } catch (error){
        console.log(error);
    }
}

export { guardarHotel, cambiarHotel, guardarHtlM, borrarHotel, eliminarAsignacionGerente, asignarGerente} 