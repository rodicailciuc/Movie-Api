import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';

// import routes
import movieRoutes from './routes/movie.js';

// import Middleware
import createLog from './middleware/createLog.js';

// configure dotenv
dotenv.config();
const PORT = process.env.PORT || 5009;

// construct the path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// initialize express
const app = express();

// parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use Middleware
app.use(createLog);

// serve static files
app.use(express.static(path.join(PATH, 'public')));

// use routes
app.use('/api', movieRoutes);

// handle 404
app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(PATH, 'views', '404.html'));
});

// error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server is down!');
});

// listen
app.listen(PORT, () => {
    console.log(`Server is up and running on port : http://localhost:${PORT}`);
});
