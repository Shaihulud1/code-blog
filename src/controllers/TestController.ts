import { Param, Body, Get, Post, Put, Delete, Controller } from 'routing-controllers';
import Test from '../models/Test';

@Controller()
export class TestController {

    @Get('/test')
    public getTest() {
        return Test.findAll()
    }
    
    @Get('/test/create')
    public async createTest() {
        const newTest = await Test.create({ name: 'test' })
        await newTest.save()
        return {}

    }
    
}