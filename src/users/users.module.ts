import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CacheableMemory } from 'cacheable';
import { Keyv } from 'keyv';
import { PrismaService } from '../prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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

  controllers: [UsersController],
  providers: [PrismaService, UsersService],
})
export class UsersModule {}
