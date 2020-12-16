import express from 'express'
import indexRouter from './routes/indexRouter';
import userRouter from './routes/userRouter'
import * as bodyParser from 'body-parser';
import Authentication from './middleware/Authentication';

class App {
    public express

    constructor() {
        this.express = express()
        this.express.use(bodyParser.json({ limit: '50mb' }))
        this.loadMiddlewares();
        this.loadRoutes()
    }

    private loadRoutes(): void {
        this.express.use('/', indexRouter);
        this.express.use('/user', userRouter);
    }

    private loadMiddlewares(): void
    {
        this.express.use('/user', Authentication.verifyToken)
    }
}

export default new App().express;