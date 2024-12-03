const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/curriculo', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM curriculo');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.post('/curriculo', async (req, res) => {
  try {
    const { nome, escolaridade, experiencia } = req.body;
    const newCurriculo = await pool.query(
      'INSERT INTO curriculo (nome, escolaridade, experiencia) VALUES ($1, $2, $3) RETURNING *',
      [nome, escolaridade, experiencia]
    );
    res.json(newCurriculo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

app.post('/curriculo', (req, res) => {
  console.log(req.body);
  const { nome, escolaridade, experiencia } = req.body;
  res.send('Currículo enviado');
});
