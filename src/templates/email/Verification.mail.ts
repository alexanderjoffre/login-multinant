import { UserDocument } from "../../schemas/user.schema";
import { IMailTemlplate } from "../../typescript/interfaces/MailTemplate.interface";

export class VerificationMailTemplate implements IMailTemlplate {

	constructor(
		private readonly user: UserDocument
	) {}

	getSubject(): string {
		return 'POX: Verificación de Cuenta'
	}

	getContent(): string {
		return `
			<h1>Verifica tu e-mail</h1>
			<p>
			Para completar tu registro en nuestra plataforma, ingresa el siguiente código:
			</p>
			<p>
			Código de verificación: <b>${this.user.auth.verificationPIN}</b>
			</p>
		`;
	}

}