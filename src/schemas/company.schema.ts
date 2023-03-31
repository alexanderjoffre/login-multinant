import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum CompanyStatus {
	ACTIVO 			= 'ACTIVO',
	SUSPENDIDO 	= 'SUSPENDIDO',
	INACTIVO 		= 'INACTIVO',
	ELIMINADO 	= 'ELIMINADO',
};

export enum CompanySuspendedReasons {
	DEUDA_IMPAGA = 'DEUDA_IMPAGA',
};

class Location {

	@Prop({ required: true })
	address: string;

	@Prop({ required: true })
	country: string;

	@Prop({ required: true })
	state: string;

	@Prop({ required: true })
	city: string;

	@Prop({ required: true })
	postalCode: string;

}

class BillingInformation {

	@Prop({ required: true })
	taxIdentifier: string;

	@Prop({ required: true })
	companyName: string;

	@Prop({ required: true })
  location: Location;

	@Prop({ required: true })
  email: string;

}

@Schema({ collection: 'companies', versionKey: false })
export class Company {
	
  @Prop({ required: true })
  displayName: string;
	
  @Prop({ required: false })
  logoBase64: string | null;
	
  @Prop({ required: true })
  billingInformation: BillingInformation;

  @Prop({ required: true, default: CompanyStatus.ACTIVO })
  status: CompanyStatus;

};

export type CompanyDocument = HydratedDocument<Company>;
export const CompanySchema = SchemaFactory.createForClass(Company);