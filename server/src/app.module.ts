import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import "dotenv/config";

import { HomeModule } from './home/home.module';
import { FileModule } from './file/file.module';
import { VideoModule } from './video/video.module';

import { User } from './entities/user.entity';
import { Video } from './entities/video.entity';
import { IdentifyModule } from './identify/identify.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // TYPEORM 의 DB 연동
        "type": "mysql", // DB 타입
        "host": process.env.DB_HOST,
        "port": Number(process.env.DB_PORT),
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        // 사용하려는 DB 는 먼저 생성된 상태일 것
        "database": process.env.DB_DATABASE, 
        "extra": {
          "ssl": {
            "rejectUnauthorized": false
          }
        },
        // 사용할 TABLE 객체 정보
        "entities": [Video, User],
        "synchronize": true, // TABLE 자동 생성
      }),
    HomeModule,
    FileModule,
    VideoModule,
    IdentifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
