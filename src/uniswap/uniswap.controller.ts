import {
  Controller,
  Get,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  BadGatewayException,
  CacheTTL,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { UniswapService } from './uniswap.service';

@Controller('uniswap')
export class UniswapController {
  constructor(private readonly uniswapService: UniswapService) {}

  @Get()
  @CacheTTL(60)
  @UseGuards(JwtAuthGuard)
  async paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(30), ParseIntPipe) limit = 30,
  ): Promise<TransactionResponseDto> {
    try {
      return await this.uniswapService.paginate(page, limit);
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
