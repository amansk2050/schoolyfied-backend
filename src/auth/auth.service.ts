import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.userId,
      username: user.username,
      permissions: user.permissons,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async showData(req) {
    const permissions = JSON.stringify(req.user.permissions);
    if (permissions.includes('READ:data')) {
      return {
        user: {
          permissions: req.user.permissions,
        },
      };
    }
  }
}
