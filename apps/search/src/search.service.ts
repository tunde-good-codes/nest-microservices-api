import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  ping() {
    return {
      ok: true,
      service: 'catalog',
      now: new Date().toISOString(),
    };
  }
}
