import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { SupportRequestsService } from 'src/modules/chats/services';

@Injectable()
export class RequestAccessGuard implements CanActivate {
  constructor(
    private readonly supportRequestsService: SupportRequestsService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.role === 'manager') {
      return true;
    }

    const id = request.params.id;
    if (!id) {
      throw new BadRequestException();
    }

    return this.supportRequestsService.findSupportRequests({ user: user.id })
      .then((requests) => {
        return requests.some(request => request.id === id)
      });
  }
}
