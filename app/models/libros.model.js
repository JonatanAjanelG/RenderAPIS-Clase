
module.exports = (sequelize, Sequelize) => {
	const Libros = sequelize.define('libros', {	
	codigolibro: {
			type: Sequelize.INTEGER,
			primaryKey: true,
    },
	nombre: {
		    type: Sequelize.STRING(60)
      },
    editorial: {
            type: Sequelize.STRING(25)
      },
	autor: {
		    type: Sequelize.STRING(25)
      },
    genero: {
            type: Sequelize.STRING(25)
      },
	paisautor: {
		    type: Sequelize.STRING(25)
      },
	numeropaginas: {
		    type: Sequelize.INTEGER
      },
    añoedicion: {
		    type: Sequelize.DATEONLY
	},
	precio: {
		    type: Sequelize.STRING(30)
      }	
	});
	
	return Libros; 
}