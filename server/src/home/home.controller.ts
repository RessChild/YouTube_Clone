import { Controller, Get, Param, Res } from '@nestjs/common';
import { get } from 'http';
import { HomeService } from './home.service';

@Controller('/api/home')
export class HomeController {
    constructor (
        private readonly homeService: HomeService,
    ) {}

    @Get('/')
    async getHome () { // 메인화면 비디오 리스트
        console.log('getHome');
        return await this.homeService.getHome();
    }

    @Get('/thumbnail/:fname')
    async getThumbnail(@Param("fname") fname: string, @Res() res) {
        console.log("getThumbnail");
        const result = await this.homeService.getThumbnail(fname);
        return res.status(200).send(result);
    }
}
