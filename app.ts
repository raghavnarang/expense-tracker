import express, { Request, Response, NextFunction } from 'express';
require('dotenv').config();

const app = express();
const port = 3000;

const getLocationsWithTimezones = async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(process.env.NODE_ENV);
};

app.get('/', getLocationsWithTimezones);

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});