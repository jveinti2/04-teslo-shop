import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new BadRequestException('User not found');

    for (const role of validRoles) {
      if (user.roles.includes(role)) {
        return true;
      }
    }
    console.log({ userRoles: user.roles });

    throw new ForbiddenException(
      `User ${user.fullName}  not have permission to access this. Need roles: [${validRoles}]`,
    );
  }
}
