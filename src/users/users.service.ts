import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async getUsers(page: number = 1, limit: number = 10) {
    // BEGIN: without cache
    // let users = await this.getUsersWithoutCache(page, limit);
    // END: without cache

    // BEGIN: with cache
    const cacheKey = `users:${page}:${limit}`;
    let users = await this.cacheManager.get(cacheKey);
    if (!users) {
      users = await this.getUsersWithoutCache(page, limit);

      // Cache the result for 60 seconds
      await this.cacheManager.set(cacheKey, users, 60 * 1000);
    }
    // END: with cache

    return users;
  }

  private async getUsersWithoutCache(page: number = 1, limit: number = 10) {
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return users;
  }
}
