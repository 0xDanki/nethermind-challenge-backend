import { Module } from '@nestjs/common';
import { UniswapService } from './uniswap.service';
import { UniswapController } from './uniswap.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UniswapController],
  providers: [UniswapService],
  imports: [ConfigModule],
})
export class UniswapModule {}
