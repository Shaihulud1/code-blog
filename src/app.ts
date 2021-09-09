import 'reflect-metadata';
import { Response, NextFunction } from "express"
import { createServer } from "http";
import { TestController } from "./controllers/TestController";
import { createExpressServer } from 'routing-controllers';

const app = createExpressServer({
    controllers: [TestController]
});
const port = 3000
app.listen(port)