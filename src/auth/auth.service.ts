import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(account: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(account);

    if (!user) return null;

    const checkPasaword = user.password === pass;
    if (!checkPasaword) return null;
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { account: user.account, sub: user.id };
    return {
      data: {
        id: user.id,
        name: user.name,
        account: user.account,
        factory: user.factory,
        role: user.role,
        is_active: user.is_active,
        created_by: user.created_by,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}
