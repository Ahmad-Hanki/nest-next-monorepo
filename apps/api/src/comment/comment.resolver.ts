import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { PaginatedComments } from 'src/common/pagination/pagination-types';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => PaginatedComments, { name: 'comments' })
  getPostComments(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('page', { type: () => Int, nullable: true }) skip?: number,
  ) {
    return this.commentService.getPostComments({ postId, take, page: skip });
  }

  @Mutation(() => Comment)
  @UseGuards(JwtAuthGuard)
  createComment(
    @CurrentUser() user: User,
    @Args('postId', { type: () => Int }) postId: number,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentService.createPostComment({
      postId,
      userId: user.id,
      createCommentInput,
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  deleteComment(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) commentId: number,
  ) {
    return this.commentService.deleteComment({
      commentId,
      userId: user.id,
      isAdmin: user.role == 'ADMIN',
    });
  }
}
