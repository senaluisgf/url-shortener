import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShortenerService {
  constructor(private prisma: PrismaService) {}

  private generateSlug(): string {
    return randomBytes(4).toString('base64url').substring(0, 6);
  }

  async create(original: string) {
    const slug = this.generateSlug();

    return this.prisma.url.create({
      data: {
        original,
        slug,
      },
    });
  }

  async getBySlug(slug: string) {
    const url = await this.prisma.url.findUnique({
      where: { slug, deletedAt: null },
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    return url.original;
  }

  async delete(id: string) {
    const url = await this.prisma.url.findUnique({ where: { id } });

    if (!url || url.deletedAt) throw new NotFoundException('URL not found');

    return this.prisma.url.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
