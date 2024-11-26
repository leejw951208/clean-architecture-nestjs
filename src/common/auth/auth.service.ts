import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcryptjs from 'bcryptjs';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      return null;
    }
    const isMatched = await bcryptjs.compare(password, user.password);
    if (!isMatched) {
      return null;
    }
    return user;
  }

  async siginin(user: User) {
    // 로그인 이력 저장
  }

  async createAccessToken(user: User) {}
}
