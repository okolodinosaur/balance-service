import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { BalanceService } from './balance.service';
import { BalanceProcessor } from './balance.processor';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'balance-deduction',
    }),
    PrismaModule,
  ],
  providers: [BalanceService, BalanceProcessor],
  exports: [BalanceService],
})
export class BalanceModule {}
