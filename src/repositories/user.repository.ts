import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { DateAdapter } from "../adapters/Date.adapter";
import { HashAdapter } from "../adapters/Hash.adapter";
import { CreateUserDto } from "../dto/user.dto";
import { TextHelper } from "../helpers/Text.helper";
import { User, UserDocument, UserRoles, UserStatus } from "../schemas/user.schema";
import { EDAteFormats } from "../typescript/enums/DateFormats.enums";

@Injectable()
export class UserRepository {

	constructor( @InjectModel(User.name) private userModel: Model<UserDocument> ){}

	async findById(userId: ObjectId): Promise<UserDocument> {
		try {
			return await this.userModel.findById(userId);
		} catch (error) {
			throw error;
		}
	}

	async create( 
		userData: CreateUserDto & { owner: string }, 
		roles: UserRoles[]
	): Promise<UserDocument> {
		try {

			const password = await HashAdapter.getHashFromText(userData.password);
			const verificationPIN: string = TextHelper.randomDigits(6);
			
			const preparedData = {
				...userData,
				auth: {
					roles,
					verificationPIN,
					password,
					loginToken: null,
					refreshToken: null,
					lastLoginAt: null,
					verified: false,
				},
				notifications: [],
				status: UserStatus.ACTIVO,
			}

			const createdUser: UserDocument = await this.userModel.create(preparedData);

			return await this.userModel.findById(createdUser._id, {
				auth: 0,
				notifications: 0,
				birthdate: 0,
			})

		} catch (error) {
			throw error;
		}
	}

	async exists(email: string): Promise<boolean> {
		try {

			const user: User = await this.userModel.findOne({
				email, 
				status: { $ne: UserStatus.ELIMINADO }
			});

			return !!user;	

		} catch (error) {
			throw error;
		}
	}

	async updateLoginInfo( 
		user: UserDocument, 
		loginToken: string, 
		refreshToken: string 
	): Promise<UserDocument> {
		try {

			return await this.userModel.findByIdAndUpdate( user._id, {
				auth: {
					loginToken,
					refreshToken,
					lastLoginAt: DateAdapter.today({
						utcDate: true,
						format: EDAteFormats.YYYYMMDD_HHmm
					}),
				}
			}, { new: true });
			
		} catch (error) {
			throw error;
		}
	}

	async update(userId: ObjectId, data): Promise<UserDocument> {
		try {
			return await this.userModel.findByIdAndUpdate(userId, data, { new: true });
		} catch (error) {
			throw error;
		}
	}

}