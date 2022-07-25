import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import redisConfigAsync from './redis.config';

@Module({
  imports: [CacheModule.registerAsync(redisConfigAsync)],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class RedisModule {}
