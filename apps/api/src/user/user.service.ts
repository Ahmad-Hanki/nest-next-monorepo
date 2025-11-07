import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { AuthService } from 'src/auth/auth.service';
import { CustomException } from 'src/common/exception/custom-exception';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService, // 👈 Inject AuthService
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { password, ...userData } = createUserInput;
    // check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await hash(password);
    const newUser = await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });

    const { accessToken } = await this.authService.generateToken(newUser.id);

    return { ...newUser, accessToken };
  }
}
