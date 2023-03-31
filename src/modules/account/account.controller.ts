import { ObjectId } from "mongoose";
import { Body, Controller, InternalServerErrorException, Post, UseInterceptors } from "@nestjs/common";
import { RegisterAccount, RegisteredAccount, VerifyAccount } from "../../dto/account.dto";
import { ExceptionInterceptor } from "../../interceptors/Exception.interceptor";
import { AccountService } from "./account.service";
import { UserService } from "../user/user.service";
import { UserDocument } from "../../schemas/user.schema";

@UseInterceptors(ExceptionInterceptor)
@Controller('account')
export class AccountController {

	constructor(
		private accountService: AccountService,
		private userService: UserService
	){}

	@Post('register')
	async create(
		@Body() data: RegisterAccount
	): Promise<RegisteredAccount> {
		try {

			// Intenta crear los datos de la empresa y el usuario
			const registeredData = await this.accountService.registerAccount(
				data.company,
				data.user
			);

			await this.accountService.sendVerificationMail(registeredData.user);

			return registeredData;
			
		} catch (error) {
			throw new InternalServerErrorException({ code: error.response.code });
		}
	}

	@Post('verify')
	async verify(
		@Body() data: VerifyAccount
	): Promise<UserDocument> {
		try {

			// Intenta crear los datos de la empresa y el usuario
			const user: UserDocument = await this.accountService.verifyAccount(
				data.userId,
				data.verificationCode
			);

			return user;
			
		} catch (error) {
			throw new InternalServerErrorException({ code: error.response.code });
		}
	}

}