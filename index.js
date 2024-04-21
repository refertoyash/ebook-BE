const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

//availablle routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`eMemobook backend listening at http://localhost:${PORT}`)
})