import { ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { PaginatedResponse } from 'src/common/pagination/paginated-response';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class PaginatedPosts extends PaginatedResponse(Post) {}

@ObjectType()
export class PaginatedComments extends PaginatedResponse(Comment) {}
