import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

import { BalanceService } from './balance.service';

@Processor('balance-deduction')
export class BalanceProcessor {
  constructor(private readonly balanceService: BalanceService) {}

  @Process()
  async handleBalanceDeduction(job: Job) {
    try {
      console.log(6666);

      const { userId, amount } = job.data;
      await this.balanceService.deductBalance(userId, amount);
    } catch (error) {
      throw new Error('Failed to deduct balance');
    }
  }
}
