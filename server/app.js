const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const apiRouter = require('./routes/api.js');

// Configuration
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.URLSTRING, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));


// Routes and middlewares
app.use('/api/', apiRouter);


// Start server
app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
});