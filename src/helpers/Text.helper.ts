export class TextHelper {
	
	private constructor() {}

	public static randomDigits(digitCount: number): string {
		let digits: string = '';

		for ( let i = 1; i <= digitCount; i++ ) {
			const digit = Math.floor(Math.random() * 9);
			digits = `${digits}${digit}`;
		}
		
		return digits;
	}
}