import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IdentifyService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // 회원가입
    async userSignUp({ firstName, lastName, email, password }) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where("user.email = :email", { email: email })
            .getOne();
     
        console.log(user);
        let new_user = null;
        if( !user ) { // 존재하지 않던 아이디면 생성
            new_user = await this.userRepository.create({
                firstName, lastName, email, password
            }).save();
        }
        return user ? 404 : ( new_user ? 200 : 401 );
    }

    // 로그인
    async userSignInEmail({ email }) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email: email })
            .getOne();
        console.log(user);
        
        if( !user ) return null;
        return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }
    }
    async userSignInPassword() {
        return "비밀번호 확인";
    }
}
