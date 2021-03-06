const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extender: false }));

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;

app.use('/api/appointments', require('./routes/api/appointments'));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
