import { Module } from '@nestjs/common';
import { IdentifyService } from './identify.service';
import { IdentifyController } from './identify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [IdentifyService],
  controllers: [IdentifyController]
})
export class IdentifyModule {}
