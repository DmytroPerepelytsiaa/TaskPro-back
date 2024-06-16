import { ForbiddenException, Inject, Injectable, PipeTransform } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DashboardEntity } from '../entities/dashboard.entity';

@Injectable()
export class UserIsNotOwnerPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private req) {}

  transform(body: DashboardEntity) {
    const email = this.req.user.email;

    if (email !== body.ownerEmail) {
      throw new ForbiddenException();
    }

    return body;
  }
}
