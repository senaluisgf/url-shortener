import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Response } from 'express';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OptionalJwtAuthGuard } from 'src/auth/optional-jwt-auth.guard';
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
  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  create(@Body('original') original: string, @Req() req: any) {
    const userId = req.user?.sub;
    return this.service.create(original, userId as string);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: any) {
    const userId = req.user.sub;
    if (!userId) {
      throw new ForbiddenException('User must have to login');
    }
    return this.service.listUserUrls(userId as string);
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

  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('original') newUrl: string,
    @Req() req: any,
  ) {
    return this.service.updateUrl(id, newUrl, req.user.sub);
  }

  // we dont map on swagger trying to avoid conflict
  @Get(':slug')
  async redirect(@Param('slug') slug: string, @Res() res: Response) {
    const originalUrl = await this.service.getBySlug(slug);
    return res.redirect(originalUrl);
  }

  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.sub;
    return this.service.delete(id, userId as string);
  }
}
