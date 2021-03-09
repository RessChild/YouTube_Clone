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
        const { writer, ...others } = await this.videoRepository
            .findOne({ vid: vid }, { relations: ['writer'] });
        return { ...others, 
            writer: writer 
                ? { firstName: writer.firstName, lastName: writer.lastName, email: writer.email }
                : { firstName: "익", lastName: "명", email: '' }
            };
    }
}
