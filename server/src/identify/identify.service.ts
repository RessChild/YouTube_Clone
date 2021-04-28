import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class IdentifyService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    findUser(email) {
        return this.userRepository
            .createQueryBuilder('user')
            .where("user.email = :email", { email: email })
            .getOne();
    }

    // 비밀번호 암호화, 복호화
    async encryptData (password: string, salt: String) {
        const enc_buf = await crypto.pbkdf2Sync(password, Buffer.from(salt), 10, 16, 'sha256');
        const result = Buffer.from(enc_buf).toString();
        return result;
    }

    // 회원가입
    async userSignUp({ firstName, lastName, email, password }) {
        // 이미 존재하는 정보인지 체크
        const user = await this.findUser(email);
        console.log(user);

        let new_user = null;
        if( !user ) { // 존재하지 않던 아이디면 생성
            const random_bytes = await crypto.randomBytes(16);
            const salt = Buffer.from(random_bytes).toString();
            const enc_pw = await this.encryptData(password, salt);

            new_user = await this.userRepository.create({
                firstName, lastName, email, 
                password: enc_pw, salt
            }).save();
        }
        return user ? 404 : ( new_user ? 200 : 401 );
    }

    // 로그인
    async userSignInEmail({ email }) {
        const user = await this.findUser(email);
        console.log(user);
        
        if( !user ) return null;
        return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }
    }

    async userSignInPassword({ email, password }) {
        const user = await this.findUser(email);
        // console.log(user);

        // 비밀번호 암호화 체크
        const enc_pw = await this.encryptData(password, user.salt);
        // console.log(enc_pw === user.password);
        return user && user.password === enc_pw ? 200 : 403 ;
    }
}
