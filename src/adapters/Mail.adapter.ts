import { IMailTemlplate } from "../typescript/interfaces/MailTemplate.interface";

const nodemailer = require('nodemailer');

export class MailAdapter {

	private constructor() {}

	public static async send(
		to: string,
		mailTemplate: IMailTemlplate
	): Promise<void> {
		try {

			const transport =	nodemailer.createTransport({
				host: process.env.SMTP_HOST,
				port: process.env.SMTP_PORT,
				secure: true,
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
			});

			await transport.sendMail({
				to,
				subject: mailTemplate.getSubject(),
				from: process.env.SMTP_USER,
				html: `
					<html>
						<head>
							<style>
								body {
									font-size: 16px;
									font-family: 'Helvetica', sans-serif;
									color: #353535;
									font-size: 9pt;
									background-color: #FBFCFF;
								}
							</style>
						</head>
						<body>
							${mailTemplate.getContent()}

							<div>
								<h4>POX Servicios Digitales SpA</h4>
							</div>
						</body>
					</html>
				`,
			});

		} catch (error) {
			throw error;
		}
	}

}