import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
interface UserPayload {
  sub: string;
  email: string;
  // outros campos que você usa
}
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(
    err: any,
    user: UserPayload,
    info: any,
    context: ExecutionContext,
  ): any | undefined {
    // return undefined instead of throw error
    return user ?? undefined;
  }
}
