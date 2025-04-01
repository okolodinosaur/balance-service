import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BalanceModule } from '../balance/balance.module';

@Module({
  imports: [PrismaModule, BalanceModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
