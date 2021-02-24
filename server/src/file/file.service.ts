import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {

    constructor (
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
    ) {}

    async a (title: string, description: string, video: string) {
        const result = await this.videoRepository.create({
            title, description, video, thumbnail: '',
        }).save();
        console.log(result);
        return result;
    }
}
