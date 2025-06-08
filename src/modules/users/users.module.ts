import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IE_User } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IE_User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
