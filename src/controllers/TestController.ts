import { Param, Body, Get, Post, Put, Delete, Controller } from 'routing-controllers';
import Article from '../models/Article';

@Controller()
export class TestController {

    @Get('/test')
    public getTest() {
        const article = Article.findAll()
        return article 
    }
    
    @Get('/test/create')
    public async createTest() {
        const newTest = await Article.create({ title: 'test', content: 'test content'})
        await newTest.save()
        return {}

    }
    
}