import { ForbiddenException, Inject, Injectable, PipeTransform } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DashboardEntity } from '@dashboards/entities';

@Injectable()
export class IsUserDashboardOwnerPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private req) {}

  transform(body: DashboardEntity) {
    const email = this.req.user.email;
    
    if (email !== body.ownerEmail) {
      throw new ForbiddenException();
    }

    return body;
  }
}
