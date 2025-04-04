import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TLSSocket } from 'tls';

@Injectable()
export class CertificateValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const socket = req.socket as TLSSocket;
    if (!socket.authorized) {
      return res
        .status(401)
        .send(
          `Client certificate not authorized: ${socket.authorizationError}`,
        );
    }
    next();
  }
}
