const express = require('express');
const app = express();
const userRoutes = require('../server-b/routes/user');


app.use('/users', userRoutes);


app.listen(3002, () => console.log('Server B running on port 3002'));
