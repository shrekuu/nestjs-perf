import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

export type TTickerPrice = {
  symbol: string;
  price: string;
};

@Injectable()
export class TickerService {
  constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}

  async getPrice(symbol: string): Promise<TTickerPrice> {
    // BEGIN: without redis
    // const price getPriceWithoutCache(symbol);
    // END: without redis

    // BEGIN: with redis
    const tickerPriceSymolRedisKey = `ticker:price:${symbol}`;
    let tickerPrice = await this.cacheManager.get<TTickerPrice>(
      tickerPriceSymolRedisKey,
    );

    if (!tickerPrice) {
      tickerPrice = await this.getPriceWithoutCache(symbol);
      await this.cacheManager.set(
        tickerPriceSymolRedisKey,
        tickerPrice,
        30_000,
      ); // Cache for 30 seconds
    }
    // END: with redis

    return tickerPrice;
  }

  private async getPriceWithoutCache(symbol: string): Promise<TTickerPrice> {
    return (await fetch(
      // `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`,  // requires API key
      `https://data-api.binance.vision/api/v3/ticker/price?symbol=${symbol}`, // public API
    ).then((res) => res.json())) as TTickerPrice;
  }
}
