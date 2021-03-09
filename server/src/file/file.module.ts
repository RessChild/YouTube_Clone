import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/entities/video.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Video, User]) ],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}
