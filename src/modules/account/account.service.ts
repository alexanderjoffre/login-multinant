import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { MailAdapter } from "../../adapters/Mail.adapter";
import { RegisteredAccount } from "../../dto/account.dto";
import { CreateCompanyDto } from "../../dto/company.dto";
import { CreateUserDto } from "../../dto/user.dto";
import { CompanyRepository } from "../../repositories/company.repository";
import { UserRepository } from "../../repositories/user.repository";
import { UserDocument, UserRoles } from "../../schemas/user.schema";
import { VerificationMailTemplate } from "../../templates/email/Verification.mail";
import { EInternalErrorCodes } from "../../typescript/enums/InternalErrorCodes.enum";
import { IMailTemlplate } from "../../typescript/interfaces/MailTemplate.interface";
import { CompanyService } from "../company/company.service";
import { UserService } from "../user/user.service";

@Injectable()
export class AccountService {

	constructor( 
		private readonly companyService: CompanyService,
		private readonly companyRepository: CompanyRepository,
		private readonly userService: UserService,
		private readonly userRepository: UserRepository
	){}
	
	async registerAccount(
		companyData: CreateCompanyDto,
		userData: CreateUserDto,
	): Promise<RegisteredAccount> {
		try {

			// Verifica si los datos a crear existen
			await this.companyService.failWhenExists(companyData);
			await this.userService.failWhenExists(userData);
			
			// Crea la empresa
			const company = await this.companyRepository.create(companyData);

			// Crea el usuario administrador
			const user: UserDocument = await this.userRepository.create({ 
				...userData, 
				owner: company._id.toString()
			}, [ UserRoles.ADMINISTRADOR ]);

			// Retorna los datos creados
			return { company, user };

		} catch (error) {
			throw new InternalServerErrorException({ code: error.response.code });
		}
	}

	async sendVerificationMail(user: UserDocument): Promise<void> {
		try {
			const mailtemplate: IMailTemlplate = new VerificationMailTemplate(user);

			await MailAdapter.send(user.email, mailtemplate);

		} catch (error) {
			throw new InternalServerErrorException({ code: EInternalErrorCodes.ESMTPSD });
		}
	}

	async verifyAccount(
		userId: ObjectId,
		verificationCode: string
	): Promise<UserDocument> {
		try {
			const user: UserDocument = await this.userRepository.findById(userId);

			if (user.auth.verificationPIN !== verificationCode) {
				throw new NotFoundException({ code: EInternalErrorCodes.EACCVRY });
			}

			return user;
		} catch (error) {
			throw new NotFoundException({ code: EInternalErrorCodes.EACCVRY });
		}
	}

}