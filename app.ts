import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';

import groupRouter from './api/group';
import entryRouter from './api/entry';
import { getUniqueSlug } from './controllers/group';
import verifyAuth from './middleware/validate-auth';

require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(verifyAuth);

/** Routers */
app.use('/group', groupRouter);
app.use('/entry', entryRouter);

app.get('/', async function (req, res) {
    const result = await getUniqueSlug('Hello World');

    res.status(200).json(result);
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

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on localhost:${process.env.PORT || port}`);
});