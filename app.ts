import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import groupRouter from './api/group';
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Routers */
app.use('/group', groupRouter);

app.get('/', async function(req, res) {
    throw new Error('Hello World');
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    if (res.headersSent) {
        return;
    }
    res.status(500);
    res.json({ error: err.message });
}

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});