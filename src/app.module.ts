import { Module } from '@nestjs/common';
import { NestListRoutesModule } from 'nest-list-routes';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { TickerModule } from './ticker/ticker.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TickerModule, UsersModule, NestListRoutesModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
