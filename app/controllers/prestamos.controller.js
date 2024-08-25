const db = require('../config/db.config.js');
const Prestamos = db.Prestamos; // Updated to use Prestamos model

exports.create = (req, res) => {
    let prestamo = {};

    try {
        prestamo.codigolibro = req.body.codigolibro;
        prestamo.codigousuario = req.body.codigousuario;
        prestamo.fechasalida = req.body.fechasalida;
        prestamo.fechamaxdevolucion = req.body.fechamaxdevolucion;
        //prestamo.fechadevolucion = req.body.fechadevolucion;

        // Save to MySQL database
        Prestamos.create(prestamo).then(result => {
            // Send created Prestamo to client
            res.status(200).json({
                message: "Préstamo creado con éxito con número de pedido = " + result.numeropedido,
                prestamo: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo!",
            error: error.message
        });
    }
}

//obtener todos los datos de libros prestados
exports.retrieveALLPrestamos = (req, res) => {

    Prestamos.findAll({
        where: {
            estado: "Pendiente de entregar"
        }
    })
    .then(prestamoInfos => {

        if(prestamoInfos.length ==0) {
            return res.status(200).json({
                message: "No se encontraron préstamos pendientes de entregar."
            });
        }

        res.status(200).json({
            message: "Los prestamos realizados son los siguientes",
            prestamos: prestamoInfos
        });

    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error",
            error: error
        });
    });
}

exports.getPrestamoById = (req, res) => {
    let pedidoId = req.params.numeropedido;
    Prestamos.findByPk(pedidoId)
        .then(prestamo => {
            if (prestamo) {
                res.status(200).json({
                    message: "Los datos del prestamo con el numero de pedido = " + pedidoId + " son: ",
                    prestamo: prestamo
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el préstamo con el número de pedido = " + pedidoId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error",
                error: error
            });
        });
}

//este es para actualizar los datos anteriores
exports.updatePrestamoById = async (req, res) => {
    try {
        let pedidoId = req.params.numeropedido;
        let prestamo = await Prestamos.findByPk(pedidoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No se encontró el préstamo para actualizar con número de pedido = " + pedidoId,
                prestamo: "",
                error: "404"
            });
        }

        let updatedObject = {
            codigolibro: req.body.codigolibro,
            codigousuario: req.body.codigousuario,
            fechasalida: req.body.fechasalida,
            fechamaxdevolucion: req.body.fechamaxdevolucion,
        };

        let result = await Prestamos.update(updatedObject, { returning: true, where: { numeropedido: pedidoId } });

        if (result[0] === 0) {
            res.status(500).json({
                message: "Error No se pudo actualizar el préstamo con número de pedido = " + pedidoId,
                error: "No se pudo actualizar",
            });
        } else {
            res.status(200).json({
                message: "Se actualizó con éxito el préstamo con número de pedido = " + pedidoId,
                prestamo: updatedObject,
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Error No se pudo actualizar el préstamo con número de pedido = " + req.params.numeropedido,
            error: error.message
        });
    }
}



//este es para actualizar unicamente la fecha de entrega del pedido y el estado 
exports.updateEntregaById = async (req, res) => {
    try {
        let pedidoId = req.params.numeropedido;
        let prestamo = await Prestamos.findByPk(pedidoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No se encontró el préstamo para actualizar con número de pedido = " + pedidoId,
                prestamo: "",
                error: "404"
            });
        }

        let updatedObject = {
            fechadevolucion: req.body.fechadevolucion,
            estado: req.body.estado
        };

        let result = await Prestamos.update(updatedObject, { returning: true, where: { numeropedido: pedidoId } });

        if (result[0] === 0) {
            res.status(500).json({
                message: "Error No se pudo actualizar el préstamo con número de pedido = " + pedidoId,
                error: "No se pudo actualizar",
            });
        } else {
            res.status(200).json({
                message: "Se actualizó con éxito el préstamo con número de pedido = " + pedidoId,
                prestamo: updatedObject,
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Error No se pudo actualizar el préstamo con número de pedido = " + pedidoID,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let pedidoId = req.params.numeropedido;
        let prestamo = await Prestamos.findByPk(pedidoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No existe el préstamo con número de pedido = " + pedidoId,
                error: "404",
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Se eliminó con éxito el préstamo con número de pedido = " + pedidoId,
                prestamo: prestamo,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error No se pudo eliminar el préstamo con número de pedido = " + req.params.numeropedido,
            error: error.message,
        });
    }
}
