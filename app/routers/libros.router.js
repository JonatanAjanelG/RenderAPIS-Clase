let express = require('express');
let router = express.Router();
 
const Libros = require('../controllers/libros.controller.js');

router.post('/api/libros/crear', Libros.create);
router.get('/api/libros/all', Libros.retrieveAllBooks);
router.get('/api/libro/get/:codigolibro',Libros.getById);
router.put('/api/libros/update/:codigolibro',Libros.updateById);
router.delete('/api/libros/delete/:codigolibro',Libros.deleteById);

module.exports = router;
