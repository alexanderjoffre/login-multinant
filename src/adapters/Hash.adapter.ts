const bcrypt = require('bcrypt');

export class HashAdapter {

	private constructor() {}

	public static async getHashFromText(text: string): Promise<string> {

		const saltRounds: number = 10;
		const salt: string = await bcrypt.genSalt(saltRounds);
		const hash: string = await bcrypt.hash(text, salt);

		return hash;
	}

	public static async verifyHash(text:string, hash: string): Promise<boolean> {
		const match: boolean = await bcrypt.compare(text, hash);
		return match;
	}

}