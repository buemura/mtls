import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as https from 'https';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async callSecureEndpoint(): Promise<string> {
    const httpsAgent = new https.Agent({
      cert: fs.readFileSync('../certs/client.crt'),
      key: fs.readFileSync('../certs/client.key'),
      ca: fs.readFileSync('../certs/ca.crt'),
      rejectUnauthorized: true,
    });

    const { data } = await firstValueFrom(
      this.httpService.get<string>('https://localhost:3000/secure', {
        httpsAgent,
      }),
    );

    return data;
  }

  async callNotSecureEndpoint(): Promise<string> {
    const agent = new https.Agent({ rejectUnauthorized: false });

    const { data } = await firstValueFrom(
      this.httpService.get<string>('https://localhost:3000/not-secure', {
        httpsAgent: agent,
      }),
    );

    return data;
  }
}
