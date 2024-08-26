const db = require('../config/db.config.js');
const Libros = db.Libros;

exports.create = (req, res) => {
    let libro = {};

    try {
        // Construir el objeto Libro desde el cuerpo de la solicitud
        libro.codigolibro = req.body.codigolibro;
        libro.nombre = req.body.nombre;
        libro.editorial = req.body.editorial;
        libro.autor = req.body.autor;
        libro.genero = req.body.genero;
        libro.paisautor = req.body.paisautor;
        libro.numeropaginas = req.body.numeropaginas;
        libro.añopublicacion = req.body.añopublicacion;
        libro.añoedicion = req.body.añoedicion;
        libro.precio = req.body.precio;

        // Guardar en la base de datos MySQL
        Libros.create(libro).then(result => {
            // Enviar mensaje de carga al cliente
            res.status(200).json({
                message: "Libro creado con éxito con id = " + result.codigolibro,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el libro",
            error: error.message
        });
    }
}

exports.retrieveAllBooks = (req, res) => {
    // Encontrar toda la información de los libros
    Libros.findAll()
        .then(librosInfos => {
            let cantidad = librosInfos.length;//esto si no funciona se quita
            res.status(200).json({
                message: "TOTAL DE LIBROS" + cantidad,
                message: "Los libros son los siguientes",

                libros: librosInfos
            });
        })
        .catch(error => {
            // Log en consola
            console.log(error);

            res.status(500).json({
                message: "ERROR",
                error: error
            });
        });
}

exports.getById = (req, res) => {

    try {

        Libros.findByPk(req.params.codigolibro).then(LibroInfo => {

            if (!LibroInfo) {
                return res.status(404).json({
                    message: "No se encontro el libro con el id: " + req.params.codigolibro,
                });
            }
            res.status(200).json({
                message: "El libro con el id: " + req.params.codigolibro + " es:",
                libro: LibroInfo,
            });
        })
    } catch (err) {
        res.status(500).json({
            message:
                "Error -> " + err.message,
        });
    };
};

exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.codigolibro;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            // Devolver respuesta al cliente
            return res.status(404).json({
                message: "No se encontró el libro para actualizar con id = " + libroId,
                libro: "",
                error: "404"
            });
        }

        // Actualizar los cambios en la base de datos
        let updatedObject = {
            nombre: req.body.nombre,
            editorial: req.body.editorial,
            autor: req.body.autor,
            genero: req.body.genero,
            paisautor: req.body.paisautor,
            numeropaginas: req.body.numeropaginas,
            añopublicacion: req.body.añopublicacion,
            añoedicion: req.body.añoedicion,
            precio: req.body.precio
        }

        let result = await Libros.update(updatedObject, { where: { codigolibro: libroId } });  // Remover `returning: true`

        if (result[0] === 0) {
            res.status(500).json({
                message: "Error: No se pudo actualizar el libro con id = " + libroId,
                error: "No se pudo actualizar",
            });
        } else {
            res.status(200).json({
                message: "Se actualizó correctamente el libro con id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error: No se pudo actualizar el libro con id = " + req.params.codigolibro,
            error: error.message
        });
    }
}


exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.codigolibro;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe un libro con id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Se eliminó correctamente el libro con id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error No se pudo eliminar el libro con id = " + req.params.codigolibro,
            error: error.message,
        });
    }
}
