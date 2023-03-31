import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from './company.schema';

export enum EnclosureStatus {
	ACTIVO 			= 'ACTIVO',
	INACTIVO 		= 'INACTIVO',
	ELIMINADO 	= 'ELIMINADO',
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

@Schema({ collection: 'enclosures', versionKey: false })
export class Enclosure {

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
	owner: Company;
	
  @Prop({ required: true })
  displayName: string;
	
  @Prop({ required: true })
  location: Location;

  @Prop({ required: true, default: EnclosureStatus.ACTIVO })
  status: EnclosureStatus;

};

export type EnclosureDocument = HydratedDocument<Enclosure>;
export const EnclosureSchema = SchemaFactory.createForClass(Enclosure);