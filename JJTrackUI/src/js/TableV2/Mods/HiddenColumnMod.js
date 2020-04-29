import UrbanTableMod from '../Modding/UrbanTableMod';
import {CELL} from '../Modding/ModTargets';
import {HIDDEN_CLM} from '../../Libs/libs';

export class HiddenColumnMod extends UrbanTableMod {
	constructor(hiddenColumns) {
		super(CELL, { columnId: [].concat(hiddenColumns) }, 'hidden', undefined, undefined, ()=> null);
	}
}