import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      example: {
        email: 'sena.luisgf@gmail.com',
        password: 'hire-him',
      },
    },
  })
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @ApiBody({
    schema: {
      example: {
        email: 'sena.luisgf@gmail.com',
        password: 'hire-him',
      },
    },
  })
  @Post('register')
  register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
