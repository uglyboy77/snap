const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
// ✅ Database connection
const pool = new Pool({
  user: 'snap_db_nygk_user',
  host: 'dpg-d7tko6e7r5hc73dff18g-a',
  database: 'snap_db_nygk',
  password: 'vkojDQdcFWyGBSA8P7YMNPOne2DCsJk2',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend running!');
});

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, password]
    );
    res.json({ message: 'User registered!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(5000, () => console.log('Server started on port 5000'));
