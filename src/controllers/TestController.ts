import { Param, Body, Get, Post, Put, Delete, Controller } from 'routing-controllers';

@Controller()
export class TestController {

    @Get('/test')
    public getTest() {
        return {
            test: 'test'
        }
    }
    
}