require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Testar conexão
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err.message);
  } else {
    console.log(" Conectado ao MySQL!");
  }
});

// Rota inicial
app.get("/", (req, res) => {
  res.send("API CRUD de Policiais 🚓 funcionando!");
});

/////////////////////////////////////////////////
//  CRUD POLICIAIS
/////////////////////////////////////////////////

// GET - Listar todos
app.get("/policiais", (req, res) => {
  db.query("SELECT * FROM policiais", (err, results) => {''
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET - Buscar por ID
app.get("/policiais/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM policiais WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Policial não encontrado" });
    res.json(results[0]);
  });
});

// POST - Criar novo
app.post("/policiais", (req, res) => {
  const { nome, patente, matricula } = req.body;
  if (!nome || !patente || !matricula) {
    return res.status(400).json({ message: "Preencha todos os campos!" });
  }

  db.query("INSERT INTO policiais (nome, patente, matricula) VALUES (?, ?, ?)",
    [nome, patente, matricula],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, nome, patente, matricula });
    }
  );
});

// PUT - Atualizar por ID
app.put("/policiais/:id", (req, res) => {
  const { id } = req.params;
  const { nome, patente, matricula } = req.body;

  db.query("UPDATE policiais SET nome=?, patente=?, matricula=? WHERE id=?",
    [nome, patente, matricula, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Policial não encontrado" });
      res.json({ message: "Policial atualizado com sucesso!" });
    }
  );
});

// DELETE - Excluir por ID
app.delete("/policiais/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM policiais WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Policial não encontrado" });
    res.json({ message: "Policial excluído com sucesso!" });
  });
});

/////////////////////////////////////////////////

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`);
});