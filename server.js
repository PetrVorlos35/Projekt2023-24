const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projekt3'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Úspěšně připojeno k databázi.");
});

app.use(bodyParser.json());
app.use(express.static('public')); // Složka, kde budou vaše HTML a JS soubory

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username a heslo jsou povinné.' });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO Uzivatele (Username, Heslo, DatumRegistrace) VALUES (?, ?, CURRENT_TIMESTAMP)';
    connection.query(query, [username, hashedPassword], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Chyba serveru při registraci uživatele.' });
      }
      res.status(201).json({ message: 'Uživatel byl úspěšně registrován.' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Chyba serveru při hashování hesla.' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Logika pro přihlášení (ověření uživatele v databázi)
});

app.listen(port, () => {
  console.log(`Server běží na portu ${port}`);
});
