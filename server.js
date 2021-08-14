// Spinning up the express server

// initiaiize express
const path = require('path');

const express = require('express');

const app = express();

// Serving static files: Set static folder
app.use(express.static(path.join('public')));

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
