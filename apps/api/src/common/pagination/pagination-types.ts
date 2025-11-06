import { ObjectType } from '@nestjs/graphql';
import { PaginatedResponse } from 'src/common/pagination/paginated-response';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class PaginatedPosts extends PaginatedResponse(Post) {}
