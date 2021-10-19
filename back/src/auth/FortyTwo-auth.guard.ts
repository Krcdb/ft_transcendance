import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    CanActivate,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class FortyTwoAuthGuard extends AuthGuard('passport-42') {
    canActivate(context: ExecutionContext) : boolean | Promise<boolean> | Observable<boolean> {
      // Add your custom authentication logic here
      // for example, call super.logIn(request) to establish a session.
      console.log("can activate");
      // console.log(context);
      // return true;
      return super.canActivate(context);
    }
  
    handleRequest(err, user, info) {
      // You can throw an exception based on either "info" or "err" arguments
      console.log("Handle Request");
      console.log("err = ", err);
      console.log("user = ", user);
      console.log("info = ", info);
      if (err || !user) {
        throw err || new UnauthorizedException();
      }
      return user;
    }
  }