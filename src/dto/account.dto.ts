import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { CompanyDocument } from "../schemas/company.schema";
import { UserDocument } from "../schemas/user.schema";
import { CreateCompanyDto } from "./company.dto";
import { CreateUserDto } from "./user.dto";

// RegisterAccount **************************************************

	// Input
	export class RegisterAccount {
		
		@IsNotEmptyObject()
		@Type(() => CreateCompanyDto)
		company: CreateCompanyDto;
		
		@IsNotEmptyObject()
		@Type(() => CreateUserDto)
		user: CreateUserDto;
		
	}

	// Output
	export class RegisteredAccount {
		company: CompanyDocument;
		user: UserDocument;
	}

// RegisterAccount **************************************************

// VerifyAccount **************************************************

	// Input
	export class VerifyAccount {

		@IsString()
		@IsNotEmpty()
		userId: ObjectId;
		
		@IsString()
		@IsNotEmpty()
		verificationCode: string;

	}