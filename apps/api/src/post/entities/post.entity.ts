import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  slug: string;

  @Field({ nullable: true })
  thumbnail: string;

  @Field()
  content: string;

  @Field()
  published: boolean;

  @Field(() => User)
  author: User;

  @Field(() => [Tag], { nullable: 'itemsAndList' })
  tags: Tag[];

  @Field(() => [Comment], { nullable: 'itemsAndList' })
  comments: Comment[];

  @Field(() => [Like], { nullable: 'itemsAndList' })
  likes: Like[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
