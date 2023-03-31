import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";

class Location {

	@IsString()
	@IsNotEmpty()
	address: string;

	@IsString()
	@IsNotEmpty()
	country: string;

	@IsString()
	@IsNotEmpty()
	state: string;

	@IsString()
	@IsNotEmpty()
	city: string;

	@IsString()
	@IsNotEmpty()
	postalCode: string;

}

class BillingInformation {

	@IsString()
	@IsNotEmpty()
	taxIdentifier: string;

	@IsString()
	@IsNotEmpty()
	companyName: string;
	
	@IsString()
	@IsNotEmpty()
  email: string;

}

export class CreateCompanyDto {

	@IsString()
	@IsNotEmpty()
  displayName: string;
	
	@IsNotEmptyObject()
	@Type(() => BillingInformation)
  billingInformation: BillingInformation;

	@IsNotEmptyObject()
	@Type(() => Location)
	location: Location

}

export class FindCompanyDto {

	@IsString()
	@IsNotEmpty()
	_id: string;

}