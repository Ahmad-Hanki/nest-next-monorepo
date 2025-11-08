import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async triggerLike({
    createLikeInput,
    userId,
  }: {
    createLikeInput: CreateLikeInput;
    userId: number;
  }) {
    try {
      const existingLike = await this.prisma.like.findFirst({
        where: {
          postId: createLikeInput.postId,
          userId,
        },
      });

      if (existingLike) {
        // If the like already exists, you can choose to remove it (unlike) or do nothing
        await this.prisma.like.delete({
          where: { id: existingLike.id },
        });
        return false; // Indicates that the like was removed
      }

      // If the like doesn't exist, create a new one
      await this.prisma.like.create({
        data: {
          postId: createLikeInput.postId,
          userId,
        },
      });
      return true; // Indicates that the like was added
    } catch (error) {
      // throw nestjs built in server error
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
