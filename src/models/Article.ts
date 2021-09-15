import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
// import {resolver} from 'graphql-sequelize';


class Article extends Model {}

Article.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.TEXT
}, { 
    sequelize, 
    modelName: 'article' 
});



(async () => {
    await sequelize.sync({force: true})
    const article = await Article.create({title: 'Article title number 1', content: 'content of da article'})
    await article.save()
    const articleItem = await Article.findOne();
    console.log(articleItem?.get('title'));
})()


export default Article;