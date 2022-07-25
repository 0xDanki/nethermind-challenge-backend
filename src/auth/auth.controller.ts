import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGenerateNonceResponseDto } from './dto/auth-generate-nonce-response.dto';

import { VerifySignatureRequestDto } from './dto/verify-signature-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('nonce')
  generateNonce(): AuthGenerateNonceResponseDto {
    return this.authService.getNonce();
  }

  @Post()
  async verify(@Body() { address, signature }: VerifySignatureRequestDto) {
    if (this.authService.isValidAddress(address) == false) {
      throw new BadRequestException(
        'Your wallet address is not a valid ethereum address.',
      );
    }

    const isValid: boolean = await this.authService.verifySignature(
      address,
      signature,
    );

    if (!isValid) {
      throw new BadRequestException(
        'The inserted signature is not valid anymore.',
      );
    }

    // TODO: use a HTTP cookie instead
    return { token: this.authService.signToken(address) };
  }
}
