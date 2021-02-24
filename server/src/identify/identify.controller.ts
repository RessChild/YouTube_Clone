import { Body, Controller, Post, Res } from '@nestjs/common';
import { IdentifyService } from './identify.service';

@Controller('/api/identify')
export class IdentifyController {
    constructor (
        private readonly identifyService: IdentifyService
    ) {}

    // 회원가입
    @Post('sign-up')
    async userSignUp(@Body() body, @Res() res) {
        const result = await this.identifyService.userSignUp(body);
        return res.status(result).end();
    }

    // 로그인
    @Post('sign-in')
    async userSignIn() {
        return await this.identifyService.userSignIn();
    }
}
