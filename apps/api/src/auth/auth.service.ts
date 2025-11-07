import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/sign-in.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, verify } from 'argon2';
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
    // Login
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

  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: await hash(refreshToken) },
    });

    return { accessToken, refreshToken };
  }

  async login(user: User) {
    const tokens = await this.generateTokens(user.id);
    return { ...user, ...tokens };
  }

  async validateJwtUser(userId: number) {
    // Passport JWT validate callback
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('Data not found');
    }
    const currentUserId = { id: user.id };
    return currentUserId;
  }

  // Validate refresh token and issue a new access token
  async refreshToken(oldAccessToken: string) {
    try {
      // 1. Decode old access token (we only need userId)
      const payload = this.jwtService.decode(oldAccessToken) as {
        sub: number;
      } | null;
      if (!payload?.sub) throw new UnauthorizedException('Invalid token');

      // 2. Get user and check refresh token
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('No refresh token found');
      }

      // 3. (Optional) You can verify that stored refresh token hasn’t expired
      // But since JWT handles expiry internally, this is usually enough.

      // 4. Generate new tokens
      const { accessToken, refreshToken } = await this.generateTokens(user.id);

      return { accessToken, refreshToken };
    } catch {
      throw new UnauthorizedException('Refresh token expired or invalid');
    }
  }
}
