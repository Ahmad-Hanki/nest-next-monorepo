import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  async getPostComments({
    postId,
    take = 5,
    page = 1,
  }: {
    postId: number;
    take?: number;
    page?: number;
  }) {
    const skip = (page - 1) * take;
    const [items, totalItems] = await Promise.all([
      this.prisma.comment.findMany({
        where: { postId },
        skip,
        take,
        include: {
          author: true,
        },
      }),
      this.prisma.comment.count({ where: { postId } }),
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

  async createPostComment({
    postId,
    createCommentInput,
    userId,
  }: {
    postId: number;
    createCommentInput: CreateCommentInput;
    userId: number;
  }) {
    const { content } = createCommentInput;
    return await this.prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId,
      },
    });
  }

  async deleteComment({
    commentId,
    userId,
    isAdmin,
  }: {
    commentId: number;
    userId: number;
    isAdmin: boolean;
  }) {
    // Base condition: the comment ID must match
    const where: any = { id: commentId };

    // Build OR conditions dynamically
    const orConditions: any[] = [{ authorId: userId }];
    if (isAdmin) {
      orConditions.push({}); // Admin can delete any comment
    }

    where.OR = orConditions;

    return await this.prisma.comment.deleteMany({
      where,
    });
  }
}
