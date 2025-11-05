import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';
import { User } from 'src/user/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    return await this.authService.validateLocalUser(signInInput);
  }
}
