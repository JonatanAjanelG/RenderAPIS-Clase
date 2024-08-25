const env = {
    database: 'umg_salama_16431',
    username: 'umg_salama_16431_user',
    password: 'bf7OzTK7F7GZt1S5DpsOPlMqSTCxwuVF',
    host: 'dpg-cqin55eehbks73c0p4s0-a', //este es el host interno
    // este es el host externo -> host: 'dpg-cqin55eehbks73c0p4s0-a.oregon-postgres.render.com', 
    dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env; 