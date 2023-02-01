const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async(correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo: correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}

const existeUsuarioPorId = async(id) => {
    //Verificar si el id existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}