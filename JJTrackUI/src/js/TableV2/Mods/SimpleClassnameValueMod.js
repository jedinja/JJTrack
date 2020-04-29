import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

export class SimpleClassnameValueMod extends UrbanTableMod {
	constructor(columns, classNames, itemIndex, rowIndex, target = Targets.DATA_VALUE) {
		super(target, { columnId: [].concat(columns), itemIndex, rowIndex }, classNames);
	}
}
