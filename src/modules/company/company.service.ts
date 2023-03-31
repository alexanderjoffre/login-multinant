import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateCompanyDto } from "../../dto/company.dto";
import { CompanyRepository } from "../../repositories/company.repository";
import { Company } from "../../schemas/company.schema";
import { EInternalErrorCodes } from "../../typescript/enums/InternalErrorCodes.enum";

@Injectable()
export class CompanyService {

	constructor( private companyRepository: CompanyRepository ) {}

	async create( companyData: CreateCompanyDto ): Promise<Company> {
		try {

			await this.failWhenExists(companyData);

			return this.companyRepository.create(companyData);

		} catch (error) {
			throw new InternalServerErrorException({ code: error.response.code });
		}
	}

	async failWhenExists(companyData: CreateCompanyDto) {
		// If company already exists, throw exception
		const alreadyExists: boolean = await this.companyRepository.exists(
			companyData.location.country,
			companyData.billingInformation.taxIdentifier
		);

		if (alreadyExists) { 
			throw new ConflictException({ code: EInternalErrorCodes.EACCDUP }); 
		}
	}

}