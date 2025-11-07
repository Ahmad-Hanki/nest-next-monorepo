import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { PaginatedPosts } from 'src/common/pagination/pagination-types';
import { RolesGuard } from 'src/auth/guards/jwt-auth/jwt-auth-roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => PaginatedPosts, { name: 'posts' })
  findAll(
    @Context() context,
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('take', { type: () => Int, nullable: true }) take: number,
  ) {
    // const user = context.req.user;
    return this.postService.findAll({ page, take });
  }
  // @Roles('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Query(() => Post, { name: 'post' })
  getPostById(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }
}
