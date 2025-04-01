import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BalanceService {
  constructor(
    @InjectQueue('balance-deduction') private balanceQueue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  async addDeductBalance(userId: number, amount: number) {
    console.log(11111);

    return await this.balanceQueue.add({ userId, amount });
  }

  async deductBalance(userId: number, amount: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (user!.balance < amount) throw new Error('Not enough balance');

    await this.prisma.user.update({
      where: { id: userId },
      data: { balance: { decrement: amount } },
    });

    await this.prisma.paymentOperation.create({
      data: {
        userId,
        action: 'deduct',
        amount,
      },
    });
  }
}
