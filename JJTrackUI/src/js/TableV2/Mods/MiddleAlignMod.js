import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

export class MiddleAlignMod extends UrbanTableMod {
	constructor(cols) {
		super(Targets.DATA_CELL, { columnId: [].concat(cols) }, 'middle-align');
	}
}