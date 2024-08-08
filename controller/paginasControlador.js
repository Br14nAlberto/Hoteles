import { Hotel } from '../models/Hoteles.js';
import { Habitacion } from '../models/Habitaciones.js';
import { Gerente } from '../models/Gerentes.js';

const credenciales = (req,res) => {
    const {
        usuario,
        clave
    } = req.body;

    //1.- consultar la base de datos con el usuario y clave
    //2.- si no existe renderizar de nuevo login
    //3.- si existe, el usuario y rol, opcional permisos
    //4.- guardar en variable de sesion
    //5.- mandarlo a inicio


       
    
}

const cerrarSesion = (req, res) => {
    req.session.destroy()
    res.render("login",{
        pagina: "Credenciales",
    });
}


const paginaInicio = async (req, res) => {
    const hoteles = await Hotel.findAll({
        attributes: ['id_htl', 'nombre', 'direccion', 'telefono', 'correo', 'id_grt']
    });
    
    res.render("inicio",{
        pagina: "Inicio",
        hoteles : hoteles,
        usuario: req.session.nombre 
    });
}

const paginaHoteles = async (req, res) => {
    res.render("hotel",{
        pagina: "Registrar Hotel",
        //hoteles : hoteles
    });
}

const paginaHabitaciones = (req, res) => {
    res.render("habitaciones",{
        pagina: "Habitaciones",
        id : req.query.id
    });
}

const paginaCaracteristicas = async (req, res) => {
    const habitaciones = await Habitacion.findAll({
        where : {id_htl : req.query.id}
    });
    const hotel = await Hotel.findAll({
        where : {id_htl : req.query.id}
    });
    const gerente = await Gerente.findAll({
        where : {id_grt : hotel[0].id_grt}
    });
    res.render("caracteristicas",{
        pagina: "Caracteristicas",
        habitaciones : habitaciones,
        gerente : gerente,
        hotel : hotel
    });
}

const paginaGerente = (req, res) => { 
    res.render("gerente",{
        pagina: "Registrar Gerente",
        id : req.query.id
    });
}

const listaGerentes = async (req, res) => { 
    const gerentes = await Gerente.findAll({
        attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono']
    });
    
    res.render("listaGerentes",{
        pagina: "Lista Gerentes",
        gerentes
    });
}

const listaHoteles = async (req, res) => { 
    const hoteles = await Hotel.findAll({
        attributes: ['id_htl', 'nombre', 'direccion', 'telefono', 'correo', 'id_grt']
    });
    const gerentes = await Gerente.findAll({
        attributes: ['id_grt', 'nombre', 'ap_paterno', 'ap_materno', 'telefono']
    });
    res.render("listaHoteles",{
        pagina: "Lista Hoteles",
        hoteles,
        gerentes
    });
}

const listaHabitaciones = async (req, res) => { 
    const hoteles = await Hotel.findAll({
        attributes: ['id_htl', 'nombre', 'direccion', 'telefono', 'correo', 'id_grt']
    });
    const habitaciones = await Habitacion.findAll({
        attributes: ['id_hbt', 'piso', 'nombre', 'refrigerador', 'id_htl']
    });
    res.render("listaHabitaciones",{
        pagina: "Lista Habitaciones",
        hoteles,
        habitaciones
    });
}

export {paginaInicio, paginaHoteles, paginaCaracteristicas, paginaHabitaciones, paginaGerente, 
    credenciales, cerrarSesion, listaGerentes, listaHoteles, listaHabitaciones}