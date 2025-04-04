import { Controller, Get, Logger } from '@nestjs/common';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Get('secure')
  getSecure(): string {
    this.logger.log('Received request at /secure from client');
    return 'Hello from Service A! This is a secure endpoint.';
  }

  @Get('not-secure')
  getNotSecure(): string {
    this.logger.log('Received request at /not-secure');
    return 'Hello from Service A! This is not a secure endpoint.';
  }
}
