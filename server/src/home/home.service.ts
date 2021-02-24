import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/entities/video.entity';
import { Repository } from 'typeorm';

import * as path from "path"
import * as fs from "fs";

@Injectable()
export class HomeService {

    constructor (
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
    ) {};

    async getHome () {
        // 모든 비디오 출력
        const videos = await this.videoRepository.createQueryBuilder('video').getMany();
        console.log(videos);
        return videos;
        // return ['test', 'video', 'home', 'page', "2", "32423"];
    }

    async getThumbnail (fname: string) {
        return await fs.promises.readFile(path.join(__dirname, '../../thumbnail', fname));
    }
}
