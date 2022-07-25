import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verifyMessage, isAddress } from 'ethers/lib/utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  getNonce() {
    return {
      message: this.configService.get('SIGNATURE_MESSAGE'),
    };
  }

  async verifySignature(address: string, signature: string): Promise<boolean> {
    const message: string = this.getNonce().message;
    const decodedAddress: string = verifyMessage(message, signature);

    if (address !== decodedAddress) {
      return false;
    }

    return true;
  }

  signToken(address: string): string {
    return this.jwtService.sign({ address });
  }

  isValidAddress(address: string): boolean {
    return isAddress(address);
  }
}
