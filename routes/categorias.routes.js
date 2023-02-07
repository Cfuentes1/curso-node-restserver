const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
//const { existeCategoria } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

//Obtener todas las cataegorias - publico
router.get('/',obtenerCategorias);


//Obtener una categoria - publico
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),

    validarCampos,
],obtenerCategoria);

//Crear categoria - privado - cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

//Actualizar categoria - privado - cualquier persona con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria)

//Eliminar categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],borrarCategoria)


module.exports = router;