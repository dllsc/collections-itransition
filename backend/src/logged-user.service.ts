import { Inject, Injectable, NotAcceptableException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class LoggedUserService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
  ) {
  }

  get userId(): number {
    if (!this.request.user) {
      throw new Error('user not logged in');
    }

    return (this.request.user as any).id;
  }
}
