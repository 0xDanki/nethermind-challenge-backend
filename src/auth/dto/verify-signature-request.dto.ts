import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class VerifySignatureRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(48)
  @MaxLength(48)
  address: string;

  @IsString()
  @IsNotEmpty()
  signature: string;
}
