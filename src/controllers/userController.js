const db = require("../database/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "segredo_super"; // depois pode melhorar isso

// cadastrar usuário
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  const hash = bcrypt.hashSync(password, 8);

  const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

  db.run(query, [name, email, hash], function (err) {
    if (err) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    return res.status(201).json({ id: this.lastID, name, email });
  });
};

// login
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const valid = bcrypt.compareSync(password, user.password);

    if (!valid) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    const token = jwt.sign({ id: user.id }, SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  });
};