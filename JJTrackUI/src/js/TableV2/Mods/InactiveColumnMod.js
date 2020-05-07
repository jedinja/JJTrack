import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

export class InactiveColumnMod extends UrbanTableMod {
	constructor(cols) {
		super(Targets.CELL, { columnId: [].concat(cols) }, 'inactive');
	}
}