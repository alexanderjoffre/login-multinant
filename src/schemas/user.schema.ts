import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from './company.schema';

export enum UserStatus {
	ACTIVO 			= 'ACTIVO',
	SUSPENDIDO 	= 'SUSPENDIDO',
	INACTIVO 		= 'INACTIVO',
	ELIMINADO 	= 'ELIMINADO',
};

export enum UserRoles {
	ADMINISTRADOR 	= 'ADMINISTRADOR',
	COMITE 					= 'COMITE',
	RESIDENTE 			= 'RESIDENTE',
};

@Schema()
class Notificactions {

	@Prop({ required: true })
	event: string;

	@Prop({ required: true })
	pushNotification: boolean;

	@Prop({ required: true })
	emailNotification: boolean;

}

@Schema()
class Auth {

  @Prop({ required: true })
  verified: boolean;

  @Prop({ required: true })
  verificationPIN: string | null;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  roles: UserRoles[];

  @Prop({ required: false })
  loginToken: string | null;
  
  @Prop({ required: false })
  refreshToken: string | null;
  
  @Prop({ required: false })
  lastLoginAt: string | null;

}

@Schema({ collection: 'users', versionKey: false })
export class User {

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
	owner: Company;

  @Prop({ required: true })
  name: string;
	
  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  birthdate: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  notifications: Notificactions[];

  @Prop({ required: true })
  auth: Auth;

  @Prop({ required: true, default: UserStatus.ACTIVO })
  status: UserStatus;

};

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);