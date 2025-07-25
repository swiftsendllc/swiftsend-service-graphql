import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { TokenType } from '../constants/auth.constants';
import { UserRoles } from './roles.decorator';

export interface JwtUser {
  sub: string; // holds userId
  jti: string; // JWT ID
  iat: number; // issued at
  exp: number; // expiration time
  version: string;
  type: TokenType;
  roles: UserRoles[];
  associated_access_token_jti: string;
}

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);

  const req = ctx.getContext<{ req: Request }>().req;
  if (!req.user) throw new UnauthorizedException();

  return req.user.sub;
});

export const CurrentUserExpanded = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);

  const req = ctx.getContext<{ req: Request }>().req;
  if (!req.user) throw new UnauthorizedException();

  return req.user;
});

declare module 'express' {
  interface Request {
    user?: JwtUser;
  }
}
