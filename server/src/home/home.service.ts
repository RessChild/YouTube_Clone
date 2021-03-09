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
        const videos = await this.videoRepository
            .createQueryBuilder('video')
            .leftJoinAndSelect('video.writer', 'user')
            .getMany();
        console.log(videos);
        // 보안이 필요한 정보는 필터링하고 전송
        return videos.map(({ writer, ...others }) => { 
                return {
                    ...others,
                    writer: writer 
                        ? { firstName: writer.firstName, lastName: writer.lastName, email: writer.email }
                        : { firstName: "익", lastName: "명", email: '' } 
                };
            })
        // return ['test', 'video', 'home', 'page', "2", "32423"];
    }

    async getThumbnail (fname: string) {
        return await fs.promises.readFile(path.join(__dirname, '../../thumbnail', fname));
    }
}
