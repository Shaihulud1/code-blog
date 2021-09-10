import { Model, DataTypes } from "sequelize";
import sequelize from "../db";


// const Test = sequelize.define('Test', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     name: { type: DataTypes.STRING }
// }, {

// });
// (async () => {
//     await sequelize.sync({force: true})
// })


class Test extends Model {}

Test.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING
}, { 
    sequelize, 
    modelName: 'test' 
});

(async () => {
    await sequelize.sync({force: true})
})


export default Test