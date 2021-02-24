import { Controller, Get, Header, Param, Res } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('/api/video')
export class VideoController {
    constructor (
        private readonly videoService: VideoService,
    ) {}

    @Get('/get-video/:vid')
    // @Header("Content-Type", "video/*")
    async getVideo (@Param('vid') vid: string, @Res() res) {
        console.log('getVideo');
        const result = await this.videoService.getVideo(vid);
        return res.end(result);
    }

    @Get('/:vid')
    async getVideoInfo (@Param('vid') vid: string) {
        console.log('getVideoInfo');
        return await this.videoService.getVideoInfo(vid);
    }
}
