import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/entities/video.entity';
import { Repository } from 'typeorm';

import * as path from "path";
import * as fs from "fs"

@Injectable()
export class VideoService {

    constructor (
        @InjectRepository(Video)
        private readonly videoRepository:Repository<Video>,
    ) {}

    async getVideo (vid: string) {
        const video = await fs.promises.readFile(path.join( __dirname, '../../videos', vid ));
        return video;
    }

    async getVideoInfo (vid: string) {
        // 선택한 비디오만 정보 전달
        const video = await this.videoRepository.findOne({ vid: vid });
        console.log(video);
        return video;
    }
}
