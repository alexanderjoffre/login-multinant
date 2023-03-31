import { EDAteFormats } from "../typescript/enums/DateFormats.enums";

const dayjs = require('dayjs');
const utc 	= require('dayjs/plugin/utc');

dayjs.extend(utc);

interface IDateParams {
	utcDate?: boolean,
	format?: EDAteFormats
}

export class DateAdapter {

	private constructor() {}

	public static today(params : IDateParams) {
		const date = params.utcDate ? dayjs.utc() : dayjs();
		return date.format(params.format ?? EDAteFormats.YYYYMMDD);
	}
}