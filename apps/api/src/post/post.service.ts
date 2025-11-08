import { Injectable, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findAll({ page = 1, take = 12 }: { page?: number; take?: number }) {
    const skip = (page - 1) * take;

    const [items, totalItems] = await Promise.all([
      this.prisma.post.findMany({ skip, take }),
      this.prisma.post.count(),
    ]);

    const totalPages = Math.ceil(totalItems / take);

    return {
      items,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      },
    };
  }
  async findOne({ id, user }: { id: number; user?: { sub: number } }) {
    console.log(user, 'user in findOne');

    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        comments: true,
        likes: true,
        postTags: true,
      },
    });

    if (!post) return null;

    // calculate likeCount
    const likeCount = post.likes.length;

    const isLikedByCurrentUser = user
      ? post.likes.some((like) => like.userId === user.sub)
      : false;

    return {
      ...post,
      likeCount,
      isLikedByCurrentUser,
    };
  }
}
