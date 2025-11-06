import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

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

  async findOne(id: number) {
    return await this.prisma.post.findUnique({ where: { id } });
  }
}
