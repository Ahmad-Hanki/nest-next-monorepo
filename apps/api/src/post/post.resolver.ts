import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';

import { PaginatedPosts } from 'src/common/pagination/pagination-types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => PaginatedPosts, { name: 'posts' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('take', { type: () => Int, nullable: true }) take: number,
  ) {
    // const user = context.req.user;
    return this.postService.findAll({ page, take });
  }
  // @Roles('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)

  @Query(() => Post, { name: 'post' })
  async getPostById(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: any, // access raw request
  ) {
    let user;
    const authHeader = context.req.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        user = new JwtService({ secret: process.env.JWT_SECRET }).verify(token);
      } catch {
        user = undefined; // invalid token, just ignore
      }
    }

    return this.postService.findOne({ id, user });
  }
}
