import 'reflect-metadata';
import { Response, NextFunction } from "express"
import { createServer } from "http";
import { TestController } from "./controllers/TestController";
import { createExpressServer } from 'routing-controllers';
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize("ludwig_db", "ludwig", "ludwig", {
    host: "localhost",
    port: 5432,
    dialect: "postgres"
});
sequelize.authenticate();


// const article = sequelize.define("Article", {
//     id: {
//         type: Sequelize.int,
//     }
// })

const app = createExpressServer({
    controllers: [TestController]
});
const port = 3000
app.listen(port)