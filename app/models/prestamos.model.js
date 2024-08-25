module.exports = (sequelize, Sequelize) => {
	const Prestamos = sequelize.define('prestamos', {	
	numeropedido: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
	codigolibro: {
		    type: Sequelize.INTEGER
      },
    codigousuario: {
        type: Sequelize.INTEGER
    },
    fechasalida: {
        type: Sequelize.DATEONLY
    },
    fechamaxdevolucion: {  
        type: Sequelize.DATEONLY
    },
    fechadevolucion: {
        type: Sequelize.DATEONLY,
        defaultValue: null
    },
    estado: {
        type: Sequelize.STRING(30),
        defaultValue: "Pendiente de entregar"
    }

	});
	
	return Prestamos; 
}