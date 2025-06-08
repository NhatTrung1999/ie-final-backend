import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CreateLoginDto } from '../dto/create-login.dto';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'account',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: Request): Promise<any> {
    const { account, password, factory } = req.body;

    const user = await this.authService.validateUser(account, password);
    if (!user) {
      throw new UnauthorizedException('Account or password is invalid!');
    }
    if (user.factory !== factory && account !== 'admin') {
      throw new BadRequestException(
        `The factory ${factory} is not this account!`,
      );
    }

    if (user.is_active === false) {
      throw new BadRequestException('This account is disabled!');
    }
    return user;
  }
}
