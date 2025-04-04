import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificateValidationMiddleware } from './middlewares/certificate-validation.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CertificateValidationMiddleware)
      .forRoutes({ path: 'secure', method: RequestMethod.ALL });
  }
}
