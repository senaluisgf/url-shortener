import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = this.jwt.sign(payload);
    return { token };
  }

  logout() {
    // I will try manager this access into a redis database (allow and block tokens list)
    // (I dont have much time)
    return { message: 'Logout successful' };
  }

  async register(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const userAlreadyExists = await this.prisma.user.findUnique({
      where: { email },
    });
    if (userAlreadyExists) {
      throw new InternalServerErrorException('Internal server error');
    }
    const user = await this.prisma.user.create({
      data: { email, password: hash },
    });
    return { id: user.id, email: user.email };
  }
}
