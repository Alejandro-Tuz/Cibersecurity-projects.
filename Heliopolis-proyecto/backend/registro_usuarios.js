const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

(async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rocio2445*',
    database: 'plataforma_gestion'
  });

  const email = 'cliente1@empresa.com';
  const password = 'PasswordSegura2025';

  const saltRounds = 12;
  const hashed = await bcrypt.hash(password, saltRounds);

  await connection.execute(
    'INSERT INTO usuarios (email, password) VALUES (?, ?)',
    [email, hashed]
  );

  console.log('Usuario creado con contraseña hasheada');
})();