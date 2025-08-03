import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

import { ShortenerService } from './shortener.service';

@ApiTags('URL')
@Controller('')
export class ShortenerController {
  constructor(private readonly service: ShortenerService) {}

  @ApiBody({
    schema: {
      example: {
        original:
          'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
      },
    },
  })
  @ApiResponse({
    schema: {
      example: {
        id: '2d95e07b-5126-4452-92a4-e431987e9d54',
        slug: 'aZbKq7',
        original:
          'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
        clicks: 0,
        createdAt: '2025-08-03T20:12:28.308Z',
        updatedAt: '2025-08-03T20:12:28.308Z',
        deletedAt: null,
      },
    },
  })
  @Post()
  create(@Body('original') original: string) {
    return this.service.create(original);
  }

  @ApiParam({ name: 'slug', example: 'aZbKq7' })
  @ApiResponse({
    schema: {
      example: {
        slug: 'aZbKq7',
        originalUrl:
          'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
        redirectsTo:
          'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
      },
    },
  })
  @Get(':slug/info')
  async getUrlInfo(@Param('slug') slug: string) {
    const originalUrl = await this.service.getBySlug(slug);
    return {
      slug,
      originalUrl,
      redirectsTo: originalUrl,
    };
  }

  // we dont map on swagger trying to avoid conflict
  @Get(':slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const originalUrl = await this.service.getBySlug(slug);
    return res.redirect(originalUrl);
  }
}
