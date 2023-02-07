const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');
//const { existeCategoria } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

//Obtener todas las cataegorias - publico
router.get('/',obtenerProductos);


//Obtener una categoria - publico
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),

    validarCampos,
],obtenerProducto);

//Crear categoria - privado - cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es una id de mongo').isMongoId(),
    validarCampos
],crearProducto)

//Actualizar categoria - privado - cualquier persona con token valido
router.put('/:id',[
    validarJWT,
    check('categoria','No es una id de mongo').isMongoId(),
    validarCampos
],actualizarProducto)

//Eliminar categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],borrarProducto)


module.exports = router;