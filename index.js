const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();

app.use(cors());
app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use('/api/appointment', require('./routes/appointmentRoutes'));

app.listen(PORT, () => {
    console.log(`El servidor Corre en el Puerto ${PORT}`);
});