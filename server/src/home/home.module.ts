import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/entities/video.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video])
  ],
  providers: [HomeService],
  controllers: [HomeController]
})
export class HomeModule {}
