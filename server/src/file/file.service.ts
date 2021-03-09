import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Video } from 'src/entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {

    constructor (
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async writePost ({ writer, title, description }, video: string) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email: writer })
            .getOne();
        const result = await this.videoRepository.create({
            writer: user, 
            title, description, video,
            thumbnail: '',
        }).save();
        console.log(result);
        return result;
    }
}
