export type TransactionResponseDto = {
  tx: string;
  blockHash: string;
  value: string;
  gasPrice: string;
  to: string;
  from: string;
}[];
