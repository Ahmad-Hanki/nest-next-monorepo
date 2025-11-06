import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/sign-in.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Data not found');
    }

    const isPasswordValid = await verify(user?.password ?? '', password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.login(user);
  }

  async generateToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async login(user: User) {
    const { accessToken } = await this.generateToken(user.id);
    return { ...user, accessToken };
  }

  async validateJwtUser(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('Data not found');
    }
    const currentUserId = { id: user.id };
    return currentUserId;
  }
}
