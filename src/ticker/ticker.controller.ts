import { Controller, Get, Query } from '@nestjs/common';
import { TickerService, TTickerPrice } from './ticker.service';

@Controller('ticker')
export class TickerController {
  constructor(private readonly tickerService: TickerService) {}

  @Get('price')
  async getPrice(@Query('symbol') symbol: string): Promise<TTickerPrice> {
    const tickerPrice = await this.tickerService.getPrice(symbol);
    return tickerPrice;
  }
}
