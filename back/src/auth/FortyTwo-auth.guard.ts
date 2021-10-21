import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    CanActivate,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class FortyTwoAuthGuard extends AuthGuard('passport-42') {}