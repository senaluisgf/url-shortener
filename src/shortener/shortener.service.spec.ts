import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ShortenerService } from './shortener.service';

describe('ShortenerService', () => {
  let service: ShortenerService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortenerService,
        {
          provide: PrismaService,
          useValue: {
            url: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ShortenerService>(ShortenerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a shortened URL with 6-char slug', async () => {
    const original = 'https://example.com/page';
    const mockSlug = 'abc123';

    jest.spyOn(service as any, 'generateSlug').mockReturnValue(mockSlug);
    jest.spyOn(prisma.url, 'create').mockResolvedValue({
      id: 'test-id',
      slug: mockSlug,
      original,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      clicks: 0,
    });

    const result = await service.create(original);

    expect(result.slug).toBe(mockSlug);
    expect(result.original).toBe(original);
    expect(prisma.url.create).toHaveBeenCalledWith({
      data: {
        slug: mockSlug,
        original,
      },
    });
  });

  it('should return the original URL from a valid slug', async () => {
    const slug = 'abc123';
    const original = 'https://example.com/page';

    jest.spyOn(prisma.url, 'findUnique').mockResolvedValue({
      id: '1',
      slug,
      original,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      clicks: 0,
    });

    const result = await service.getBySlug(slug);
    expect(result).toBe(original);
  });
});
