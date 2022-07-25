import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import type { ClientOpts } from 'redis';

export default {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<ClientOpts> => {
    return {
      store: redisStore,
      name: configService.get('REDIS_CLIENT'),
      host: configService.get('REDIS_HOST'),
      port: parseInt(configService.get('REDIS_PORT')),
    };
  },
};
