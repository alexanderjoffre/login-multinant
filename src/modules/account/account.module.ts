import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyRepository } from '../../repositories/company.repository';
import { UserRepository } from '../../repositories/user.repository';
import { Company, CompanySchema } from '../../schemas/company.schema';
import { User, UserSchema } from '../../schemas/user.schema';
import { CompanyModule } from '../company/company.module';
import { UserService } from '../user/user.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: User.name, schema: UserSchema },
    ]),
    CompanyModule
  ],
  controllers: [AccountController],
  providers: [
    CompanyRepository, AccountService, 
    UserRepository, UserService
  ]
})
export class AccountModule {}