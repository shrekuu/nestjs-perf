import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CacheableMemory } from 'cacheable';
import { Keyv } from 'keyv';
import { TickerController } from './ticker.controller';
import { TickerService } from './ticker.service';

@Module({
  imports: [
    // simple memory cache
    CacheModule.register(),

    // redis cache
    // CacheModule.registerAsync({
    //   useFactory: async () => {
    //     return {
    //       stores: [
    //         new Keyv({
    //           store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
    //         }),
    //         createKeyv('redis://localhost:6379'),
    //       ],
    //     };
    //   },
    // }),
  ],
  controllers: [TickerController],
  providers: [TickerService],
})
export class TickerModule {}
