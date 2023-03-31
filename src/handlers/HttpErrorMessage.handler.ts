import { 
	BadRequestException,
	ConflictException,
	HttpException, 
	HttpStatus,
	InternalServerErrorException,
	NotFoundException,
	ServiceUnavailableException,
} from "@nestjs/common";
import { EInternalErrorCodes } from "../typescript/enums/InternalErrorCodes.enum";

export class HttpErrorMessagesHandler {

	private static readonly httpErrorMessages: Map<
		EInternalErrorCodes,
		HttpException
	> = new Map([

		[ EInternalErrorCodes.EBADREQ, new BadRequestException({
			internalCode: EInternalErrorCodes.EBADREQ,
			httpCode: HttpStatus.BAD_REQUEST,
			description: 'La data proporcionada no cumple con el formato solicitado',
			stdout: 'Petición errónea',
		})],

		[ EInternalErrorCodes.EACCDUP, new ConflictException({
			internalCode: EInternalErrorCodes.EACCDUP,
			httpCode: HttpStatus.CONFLICT,
			description: 'Los datos proporcionados ya existen en la base de datos',
			stdout: 'Los datos proporcionados ya se encuentra registrada en la plataforma.',
		})],

		[ EInternalErrorCodes.EGENTKN, new InternalServerErrorException({
			internalCode: EInternalErrorCodes.EGENTKN,
			httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Error al generar el JWT del usuario',
			stdout: 'No pudo realizarse el inicio de sesión',
		})],

		[ EInternalErrorCodes.ESMTPSD, new ServiceUnavailableException({
			internalCode: EInternalErrorCodes.ESMTPSD,
			httpCode: HttpStatus.SERVICE_UNAVAILABLE,
			description: 'No se pudo enviar el correo electrónico',
			stdout: 'No se pudo enviar el correo electrónico',
		})],

		[ EInternalErrorCodes.EACCVRY, new NotFoundException({
			internalCode: EInternalErrorCodes.EACCVRY,
			httpCode: HttpStatus.NOT_FOUND,
			description: 'Ocurrió un error intentando verificar el código PIN del usuario',
			stdout: 'No se pudo verificar la cuenta',
		})],

		[ EInternalErrorCodes.EDBFIND, new NotFoundException({
			internalCode: EInternalErrorCodes.EDBFIND,
			httpCode: HttpStatus.NOT_FOUND,
			description: 'Ocurrió un error al intentar buscar el registro en la base de datos',
			stdout: 'No se encuentra el registro',
		})],
		
	]);

	private constructor() {}

	/**
	 * Return an HttpException instance depending con code param
	 * @param code EInternalErrorCodes
	 * @returns HttpException
	 */
	public static getMesagge(code: EInternalErrorCodes): HttpException {		
		return HttpErrorMessagesHandler.httpErrorMessages.get(code);
	}
}