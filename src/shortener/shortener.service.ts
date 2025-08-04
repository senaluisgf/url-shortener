import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShortenerService {
  constructor(private prisma: PrismaService) { }

  private generateSlug(): string {
    return randomBytes(4).toString('base64url').substring(0, 6);
  }

  async create(original: string, userId?: string) {
    const slug = this.generateSlug();

    return this.prisma.url.create({
      data: {
        original,
        slug,
        userId,
      },
    });
  }

  async updateUrl(id: string, newUrl: string, userId?: string) {
    const url = await this.prisma.url.findUnique({ where: { id } });
    if (!url || url.deletedAt) throw new NotFoundException('URL not found');

    if (url.userId) {
      if (url.userId !== userId) throw new ForbiddenException();
    } else if (userId) {
      throw new ForbiddenException('Guests users only can edit guests URLs');
    }

    return this.prisma.url.update({
      where: { id },
      data: { original: newUrl },
    });
  }

  async getBySlug(slug: string) {
    const url = await this.prisma.url.findUnique({
      where: { slug, deletedAt: null },
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    await this.prisma.url.update({
      where: { id: url.id },
      data: { clicks: { increment: 1 } }
    });

    return url.original;
  }

  async delete(id: string, userId?: string) {
    const url = await this.prisma.url.findUnique({ where: { id } });

    if (!url || url.deletedAt) throw new NotFoundException('URL not found');

    if (url.userId) {
      if (!userId) {
        throw new ForbiddenException('Guests user only guests URLs');
      } else if (url.userId !== userId) {
        throw new ForbiddenException('You dont delete someone else URL');
      }
    }
    return this.prisma.url.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async listUserUrls(userId: string) {
    return this.prisma.url.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }
}
