import 'reflect-metadata';
import { Response, NextFunction } from "express"
import { createServer } from "http";
import { TestController } from "./controllers/TestController";
import { createExpressServer } from 'routing-controllers';
import { Sequelize } from 'sequelize';

const app = createExpressServer({
    controllers: [TestController]
});
const port = 3000
try {
    app.listen(port)
    console.log('🚀 Server is running on port ' + port);
} catch (err) {
    console.error(err);
}