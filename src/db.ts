import { Sequelize } from "sequelize";

const sequelize = new Sequelize('blog', 'root', 'root', {
    host: 'db',
    dialect: 'postgres'
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Sequilize is running 🚀');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

})()

export default sequelize