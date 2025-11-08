import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  toggleLike(
    @CurrentUser() user: User,
    @Args('createLikeInput') createLikeInput: CreateLikeInput,
  ) {
    return this.likeService.triggerLike({ createLikeInput, userId: user.id });
  }
}
