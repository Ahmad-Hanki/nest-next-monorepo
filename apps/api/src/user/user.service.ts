import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService, // 👈 Inject AuthService
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { password, ...userData } = createUserInput;
    const hashedPassword = await hash(password);
    const newUser = await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });

    const { accessToken } = await this.authService.generateToken(newUser.id);

    return { ...newUser, accessToken };
  }
}
