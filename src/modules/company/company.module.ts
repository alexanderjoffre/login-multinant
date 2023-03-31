import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyRepository } from '../../repositories/company.repository';
import { Company, CompanySchema } from "../../schemas/company.schema";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  providers: [CompanyRepository, CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}