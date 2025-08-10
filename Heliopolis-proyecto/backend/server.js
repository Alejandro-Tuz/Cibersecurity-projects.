require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rocio2445*',
  database: 'plataforma_gestion'
});

// limit login attempts
const limiter = rateLimit({
  windowMs: 15*60*1000,
  max: 10,
  message: 'Demasiados intentos, prueba más tarde.'
});
app.use('/login', limiter);

// login con JWT
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'Credenciales inválidas' });
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });
    res.json({ success: true, token });
  });
});

// middleware para rutas protegidas
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send({ message: 'No autorizado' });

  const token = auth.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ message: 'Token inválido o expirado' });
    req.user = decoded;
    next();
  });
};

//RUTA PROTEGIDA
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send({ message: `Hola usuario ${req.user.email}` });
});

// Iniciar servidor
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});

// logout no es necesario en JWT, basta escapar token en cliente