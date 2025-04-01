import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private balanceService: BalanceService,
  ) {}

  async create() {
    return this.prisma.user.create({});
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id }, include: { history: true } });
  }

  async deductBalance(userId: number, amount: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new Error('User not found');
    if (user.balance < amount) throw new Error('Not enough balance');

    const job = await this.balanceService.addDeductBalance(userId, amount);

    return { message: 'Balance deduction job added', jobId: job.id };
  }
}
