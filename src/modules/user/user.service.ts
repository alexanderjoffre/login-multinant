import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TokenAdapter } from "../../adapters/Token.adapter";
import { CreateUserDto } from "../../dto/user.dto";
import { UserRepository } from "../../repositories/user.repository";
import { UserDocument, UserRoles } from "../../schemas/user.schema";
import { EInternalErrorCodes } from "../../typescript/enums/InternalErrorCodes.enum";

@Injectable()
export class UserService {

	constructor( private userRepository: UserRepository ) {}

	async login( user: UserDocument ): Promise<UserDocument> {

		try {
			// Setea Tokens de acceso
			const loginToken 		= await TokenAdapter.encode(user, '1d');
			const refreshToken 	= await TokenAdapter.encode(user, '30d');

			const loggedInUser: UserDocument = await this.userRepository.updateLoginInfo( 
				user, 
				loginToken, 
				refreshToken 
			);

			return loggedInUser;	
		} catch (error) {
			throw new InternalServerErrorException({ code: EInternalErrorCodes.EGENTKN });
		}
	}

	async failWhenExists(user: CreateUserDto) {

		// If company already exists, throw exception
		const alreadyExists: boolean = await this.userRepository.exists(user.email);

		if (alreadyExists) { 
			throw new ConflictException({ code: EInternalErrorCodes.EACCDUP }); 
		}
	}

}