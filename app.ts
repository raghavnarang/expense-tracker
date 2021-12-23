import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';

import groupRouter from './api/group';
import entryRouter from './api/entry';
import { getUniqueSlug } from './controllers/group';
import verifyAuth from './middleware/validate-auth';

require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors({
    origin: 'https://eager-fermi-101ff4.netlify.app',
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Allow origin & options middleware */
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Credentials", 'true');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
//   });

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