const { request,response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request,res = response,next) =>{

    const token = req.header('x-token');
    console.log(token);

    if(!token){
        return res.status(404).json({
            msg: 'no hay token'
        });
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        //leer el usuario que corresponder al ui
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Usuario no existe en BD'
            });
        }

        //Verificar si el uid del usuario tiene true
        if(!usuario.estado){
            return res.status(404).json({
                msg: 'Token no valido'
            });
        }


        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            msg: 'Token no valido'
        });
        
    }
    next();
}

module.exports = {
    validarJWT
}