import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

// must to mock bcrypt return
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: Partial<PrismaService>;
  let jwt: Partial<JwtService>;

  const validUser = {
    id: 'user-id',
    email: 'user@example.com',
    password: 'hashed-password',
  };

  beforeEach(() => {
    //reset mock for each test call
    (bcrypt.compare as jest.Mock).mockReset();

    prisma = {
      user: {
        findUnique: jest.fn(async ({ where }) =>
          where.email === validUser.email ? validUser : null,
        ),
        create: jest.fn(async ({ data }) => ({
          id: 'new-id',
          email: data.email,
        })),
      },
    } as any;

    jwt = {
      sign: jest.fn(() => 'mocked-token'),
    };

    authService = new AuthService(prisma as PrismaService, jwt as JwtService);
  });

  it('should return token on valid login', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    const result = await authService.login(validUser.email, 'validpassword');
    expect(result).toEqual({ token: 'mocked-token' });
  });

  it('should throw on invalid email', async () => {
    await expect(
      authService.login('wrong@example.com', 'password'),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw on invalid password', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    await expect(
      authService.login(validUser.email, 'wrongpassword'),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should register user and return id and email', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
    const result = await authService.register('new@example.com', '123456');
    expect(result).toEqual({ id: 'new-id', email: 'new@example.com' });
  });

  it('should logout successfully', async () => {
    const result = await authService.logout();
    expect(result).toEqual({ message: 'Logout successful' });
  });
});
