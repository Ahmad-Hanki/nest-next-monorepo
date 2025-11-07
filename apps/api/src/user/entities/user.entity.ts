import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => [Post], { nullable: 'itemsAndList' })
  posts?: Post[];

  @Field(() => [Comment], { nullable: 'itemsAndList' })
  comments: Comment[];

  @Field(() => Role)
  role: Role;

  @Field({ nullable: true })
  accessToken?: string;
}
