const {response,request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs'); 


const usuariosGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const usuarios = await Usuario.find({estado: true})
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments({estado : true});

    /*
    const resp = Promise.all([
        Usuario.countDocuments({estado : true}),
        Usuario.find({estado: true})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    */

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async(req, res = response) => {
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt);

    //Guardar en la BD
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    })
}

const usuariosPut = async(req, res = response) => {
    const {id} = req.params;
    const {_id,password , google,correo, ...resto} = req.body;

    //Todo validar contra la base de datos
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({usuario})
}
const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});
    const usuarioAutenticado = req.usuario;

    res.json({usuario,usuarioAutenticado});
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}