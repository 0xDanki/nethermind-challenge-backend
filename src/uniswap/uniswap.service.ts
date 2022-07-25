import { Injectable, OnModuleInit } from '@nestjs/common';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { ConfigService } from '@nestjs/config';
import { formatEther } from 'ethers/lib/utils';
import { Log } from '@ethersproject/abstract-provider';

@Injectable()
export class UniswapService implements OnModuleInit {
  private provider: StaticJsonRpcProvider;
  private deployedBlock: number;
  private contractAddress: string;
  private blocksPerIteration = 50;

  constructor(private configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const nodeUrl: string = this.configService.get('ETHEREUM_NODE_URL');
    const contract: string = this.configService.get(
      'UNISWAP_SMARTCONTRACT_ADDRESS',
    );
    const block = parseInt(this.configService.get('DEPLOYED_BLOCK'));

    this.provider = new StaticJsonRpcProvider(nodeUrl);
    this.contractAddress = contract;
    this.deployedBlock = block;
  }

  async paginate(page: number, limit: number) {
    let currentBlock: number = await this.provider.getBlockNumber();

    const endAt: number = page * limit;
    const startAt: number = endAt - limit;
    let count = 0;
    let transactionLogs: Log[] = [];

    while (currentBlock > this.deployedBlock) {
      const logs: Log[] = await this.provider.getLogs({
        fromBlock: currentBlock - this.blocksPerIteration,
        toBlock: currentBlock,
        address: this.contractAddress,
      });

      count += logs.length;

      if (count >= startAt) {
        transactionLogs = [...transactionLogs, ...logs];
      }

      if (count >= endAt) {
        break;
      }

      currentBlock -= this.blocksPerIteration;
    }

    if (count > endAt) {
      transactionLogs.length = transactionLogs.length - (count - endAt);
    }

    if (transactionLogs.length > limit) {
      transactionLogs = transactionLogs.slice(-limit);
    }

    const transactions = transactionLogs.map(async (log) => {
      const { hash, blockHash, value, to, from, gasPrice } =
        await this.provider.getTransaction(log.transactionHash);

      return {
        tx: hash,
        blockHash,
        value: formatEther(Number(value)),
        gasPrice: formatEther(Number(gasPrice)),
        to: to,
        from: from,
      };
    });

    return await Promise.all(transactions);
  }
}
