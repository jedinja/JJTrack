import UrbanTableMod from '../Modding/UrbanTableMod';
import {DATA_ROW} from '../Modding/ModTargets';

export class RowClassMod extends UrbanTableMod {
	constructor(rowKey, className) {
		super(DATA_ROW, { rowKey }, className);
	}
}