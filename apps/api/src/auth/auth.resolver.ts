import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { SignInInput } from './dto/sign-in.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    return await this.authService.validateLocalUser(signInInput);
  }

  @Mutation(() => String)
  async refreshToken(@Args('token') token: string) {
    const { accessToken } = await this.authService.refreshToken(token);
    return accessToken;
  }
}
