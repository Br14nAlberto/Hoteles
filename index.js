import express from "express";
import db from './config/db.js';
import rutas from './rutas/index.js';
import session from "express-session";
import { nanoid } from "nanoid";
import { Hotel } from "./models/Hoteles.js";

const app = express();

db.authenticate()
    .then(() => console.log("Conexion exitosa"))
    .catch(error => console.log(error));

const port = process.env.PORT || 1900;

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.set("view engine", "pug");

app.use(session({
    secret:nanoid(),
    resave:true,
    saveUninitialized:true
}));

app.use( async (req, res, next)  => {
    const ano = new Date();
    res.locals.tiempo = " " + ano.getFullYear();
    console.log(req.url);
    
    try{
        if(req.url==="/credenciales"){
            console.log(req.body);
            const { usuario, clave } = req.body;
            console.log(usuario+ " "+ clave);
            console.log("prueba");
            if(usuario==="demo" && clave==="123"){
                console.log("Entrada 1")        
                req.session.nombre="FES";
                req.session.rol="adm";
                console.log(req.session.nombre + " "+req.session.rol)
                const hoteles = await Hotel.findAll({
                    attributes: ['id_htl', 'nombre', 'direccion', 'telefono', 'correo', 'id_grt']
                });
                
                res.render("inicio",{
                    pagina: "Inicio",
                    hoteles : hoteles,
                    usuario: req.session.nombre 
                });       
            }else{
                res.render("login",{
                    pagina:"Credenciales"           
                });    
            }  
        }else{
            if(req.session.rol===undefined){
                console.log("no existe......1 "+req.session.rol);
                res.render("login",{
                    pagina:"Credenciales"           
                });   
            }else{
                console.log("si existe......2 "+req.session.rol);
             
                return next();
            }
            
        }
        
    }catch(e){
        console.log(e)
        res.render("login",{
            pagina:"Credenciales"           
        });
    }
});

app.use("/", rutas);

app.listen(port, () => {
    console.log(`Servidor iniciando en el puerto ` + port);
});