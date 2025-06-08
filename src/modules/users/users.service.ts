import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IE_User } from './entities/users.entity';
export type User = any;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(IE_User)
    private usersRepository: Repository<IE_User>,
  ) {}

  async findOne(account: string): Promise<IE_User | null> {
    return this.usersRepository.findOne({ where: { account } });
  }
}
