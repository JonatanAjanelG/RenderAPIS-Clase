let express = require('express');
let router = express.Router();
 
const Prestamos = require('../controllers/prestamos.controller.js');

router.post('/api/prestamo/crear', Prestamos.create);
router.get('/api/prestamos/all', Prestamos.retrieveALLPrestamos);
router.get('/api/prestamo/xid/:numeropedido',Prestamos.getPrestamoById);
router.put('/api/prestamo/updPrestamo/:numeropedido',Prestamos.updatePrestamoById);
router.put('/api/prestamo/updEntrega/:numeropedido',Prestamos.updateEntregaById);
router.delete('/api/prestamo/delete/:numeropedido',Prestamos.deleteById);

module.exports = router;
