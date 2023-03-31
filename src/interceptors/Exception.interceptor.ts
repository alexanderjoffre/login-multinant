import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable } from "rxjs";
import { HttpErrorMessagesHandler } from "../handlers/HttpErrorMessage.handler";
import { EInternalErrorCodes } from "../typescript/enums/InternalErrorCodes.enum";

@Injectable()
export class ExceptionInterceptor implements NestInterceptor{

	intercept( 
		_context: ExecutionContext, 
		next: CallHandler<any>
	): Observable<any> {

		return next.handle()
				.pipe( catchError( error => { 
					throw HttpErrorMessagesHandler.getMesagge(error.response.code || EInternalErrorCodes.EBADREQ);
				}));

	}
}