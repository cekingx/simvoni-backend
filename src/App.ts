import express from 'express'
import indexRouter from './routes/indexRouter';
import superRouter from "./routes/superRouter";
import * as bodyParser from 'body-parser';
import Authentication from './middleware/Authentication';
const cors = require('cors');
const helmet = require('helmet');

class App {
    public express

    constructor() {
        this.express = express()
        this.express.use(bodyParser.json({ limit: '50mb' }))
        this.express.use(cors());
        this.express.use(helmet());
        this.loadMiddlewares();
        this.loadRoutes()
    }

    private loadRoutes(): void {
        this.express.use('/', indexRouter);
        this.express.use('/super-admin', superRouter);
    }

    private loadMiddlewares(): void
    {
        // this.express.use('/user', Authentication.verifyToken)
    }
}

export default new App().express;