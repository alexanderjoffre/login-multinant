import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCompanyDto } from "../dto/company.dto";
import { Company, CompanyDocument, CompanyStatus } from "../schemas/company.schema";

@Injectable()
export class CompanyRepository {

	constructor( @InjectModel(Company.name) private companyModel: Model<CompanyDocument> ){}

	async create( companyData: CreateCompanyDto ): Promise<CompanyDocument> {
		try {
			
			return await this.companyModel.create({
				...companyData,
				logoBase64: null,
				status: CompanyStatus.ACTIVO
			});

		} catch (error) {
			throw error;
		}
	}

	async findByIdentifier( country: string, taxIdentifier: string ): Promise<CompanyDocument> {
		try {
			
			return await this.companyModel.findOne({
				'location.country': country,
				'billingInformation.taxIdentifier': taxIdentifier
			});

		} catch (error) {
			throw error;
		}
	}

	async exists(country: string, taxIdentifier: string): Promise<boolean> {
		try {
			const company: Company = await this.findByIdentifier(country, taxIdentifier);
	
			return !!company;
			
		} catch (error) {
			throw error;
		}
	}

}