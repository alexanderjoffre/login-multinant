import { UserDocument } from "../schemas/user.schema";

const jwt = require('jsonwebtoken');

export class TokenAdapter {

	private constructor() {}

	/**
	 * Crea un token JWT con el id, email y roles del usuario.
	 * Si no se especifica una duración, por defecto será 1 día
	 * 
	 * @param user UserDocument
	 * @param expiresIn string
	 * @returns string
	 */
	public static async encode(
		user: UserDocument,
		expiresIn: string = '1d'
	): Promise<string> {
		try {
			const tokenData = {
				id: user._id,
				email: user.email,
				roles: user.auth.roles,
			}

			const token: string = await jwt.sign(
				tokenData,
				process.env.JWT_SECRET,
				{ expiresIn }
			);

			return token;
		} catch (error) {
			throw error;
		}
	}

	public static async verify(token: string): Promise<UserDocument> {
		try {

			const tokenData = await jwt.verify(token, process.env.JWT_SECRET);
			return tokenData;

		} catch (error) {
			throw error;
		}
	}

}