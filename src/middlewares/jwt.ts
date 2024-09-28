import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1]; // Get token from 'Bearer <token>'

    try {
      const decoded = await this.jwtService.verifyAsync(token); // Verify token
      request.user = decoded; // Attach the decoded user to the request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
