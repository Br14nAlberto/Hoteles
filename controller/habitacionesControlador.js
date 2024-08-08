import { Habitacion } from "../models/Habitaciones.js";
import { Hotel } from "../models/Hoteles.js";

const guardarHabitacion = async (req, res) => {
    const { piso, nombre, refrigerador, id_htl } = req.body;
    const errores = [];
    if (piso.trim() === ""){
        errores.push({mensaje: "El piso no debe ser vacio" });
    }
    if (nombre.trim() === ""){
        errores.push({mensaje: "El nombre no debe ser vacia" });
    }
    if (refrigerador === undefined){
        errores.push({mensaje: "Elija opcion de refrigerador" });
    }
    if (errores.length>0){
        res.render("habitaciones", {
            pagina: "Registrar Habitacion",
            errores,
            piso,
            nombre,
            refrigerador,
            id_htl
        });
    } else {
        try {
            await Habitacion.create({
                piso,
                nombre,
                refrigerador
            });
            res.redirect("/listaHabitaciones");
        } catch (error){
            console.log(error);
        }
    }
};

const cambiarHabitacion = async (req, res) => {
    try {
        const habitacion = await Habitacion.findByPk(req.query.id);
        const piso = habitacion.piso;
        const nombre = habitacion.nombre;
        const refrigerador = habitacion.refrigerador;
        const id_htl = habitacion.id_htl;
        res.render("modificarHab", {
            pagina: "Modificar Habitación",
            id_hbt : req.query.id,
            piso,
            nombre,
            refrigerador,
            id_htl
        });
    } catch (error){
        console.log(error);
    }
};

const guardarHabitacionM = async (req, res) => {
    const {piso, nombre, refrigerador, id_hbt, id_htl} = req.body;
    const errores = [];
    if (piso.trim() === ""){
        errores.push({mensaje: "El piso no debe ser vacio" });
    }
    if (nombre.trim() === ""){
        errores.push({mensaje: "La nombre no debe ser vacia" });
    }
    if (refrigerador === undefined){
        errores.push({mensaje: "Elija opcion de refrigerador" });
    }
    if (errores.length>0){
        res.render("habitaciones", {
            errores,
            piso,
            nombre,
            refrigerador
        });
    } else {
        try {
            await Habitacion.update({
                piso : piso,
                nombre : nombre,
                refrigerador : refrigerador
            }, {
                where: {id_hbt : id_hbt}
            },{
                multi: false
            });
            res.redirect(`/caracteristicas?id=${id_htl}`);
        } catch (error){
            console.log(error);
        }
    }
};

const borrarHabitaciones = async (req, res) => {
    try {
        await Habitacion.destroy( {where: {id_hbt : req.query.id}});
        res.redirect("listaHabitaciones");
    } catch (error){
        console.log(error);
    }
}

const eliminarAsignacionHotel = async (req, res) => {
    try {
        await Habitacion.update({
            id_htl: null
        }, {
            where : {
                id_hbt : req.query.id
            }
        }, {
            multi: false
        }
        );
        res.redirect("/listaHabitaciones");
    } catch (error){
        console.log(error);
    }
}

const asignarHotel =  async (req, res) => {
    const {hotel, id_hbt} = req.body;
    const hoteles = await Hotel.findAll({
        attributes: ['id_htl', 'nombre', 'direccion', 'telefono', 'correo', 'id_grt']
    });
    const habitaciones = await Habitacion.findAll({
        attributes: ['id_hbt', 'piso', 'nombre', 'refrigerador', 'id_htl']
    });
    const errores = [];
    try {
        const habitacion = await Habitacion.findAll({where: {id_htl: hotel}});
        if (habitacion.length < 3) {
            console.log("entra")
            await Habitacion.update({
                id_htl: hotel
            }, {
                where : {
                    id_hbt : id_hbt
                }
            }, {
                multi: false
            }
            );
            res.redirect("/listaHabitaciones");
        } else {
            errores.push({mensaje: "El hotel ya cuenta con 3 habitaciones" });
            res.render("listaHabitaciones",{
                pagina: "Lista Habitaciones",
                hoteles,
                habitaciones,
                errores
            });
        }
    } catch (error){
        console.log(error);
    }
}

export {guardarHabitacion, cambiarHabitacion, guardarHabitacionM, borrarHabitaciones, eliminarAsignacionHotel, asignarHotel}