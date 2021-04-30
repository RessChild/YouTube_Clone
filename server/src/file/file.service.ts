import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Video } from 'src/entities/video.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class FileService {

    constructor (
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // 작성한 포스트 기록
    async getPosts({ email }) {
        console.log(email);
        const writer = await this.userRepository.findOne({ email });
        // console.log(writer);
        const posts = await this.videoRepository.find({
            writer: writer
        });
        // console.log(posts);

        return posts;
        
        /*
        [{
            video: 'abc',
            date: '1234',
            views: '1',
            comments: '3',
        }];
        */
    }

    // 동영상 업로드 (작성)
    async writePost ({ writer, title, description }, video: string) {
        // 트랜젝션
        const queryRunner = getConnection().createQueryRunner();
        try {
            queryRunner.startTransaction(); // 트랜젝션 시작

            const user = await this.userRepository
                .createQueryBuilder('user')
                .where('user.email = :email', { email: writer })
                .getOne();
            if( !user ) {
                console.log("no user data. fail upload video");
                return null;
            }

            const result = await this.videoRepository.create({
                writer: user, 
                title, description, video,
                thumbnail: '',
            }).save();
            console.log(result);

            queryRunner.commitTransaction(); // 적용시킴
            return result;
        } catch (e) {
            queryRunner.rollbackTransaction(); // 이전으로 되돌림
        } finally {
            queryRunner.release(); // 종료
        }
    }
}
