import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

import { BalanceService } from './balance.service';

@Processor('balance-deduction')
export class BalanceProcessor {
  constructor(private readonly balanceService: BalanceService) {}

  @Process()
  async handleBalanceDeduction(job: Job) {
    try {
      const { userId, amount } = job.data;

      await this.balanceService.deductBalance(userId, amount);
    } catch (error) {
      console.log('Failed to deduct balance');
      throw new Error('Failed to deduct balance');
    }
  }
}
