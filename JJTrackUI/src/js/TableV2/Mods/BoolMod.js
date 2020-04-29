import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

class BoolMod extends UrbanTableMod {
	constructor(dateColumns) {
		super(Targets.DATA_VALUE, { columnId: [].concat(dateColumns) }, [], null,
			val => val ? 'Да' : ' ');
	}
}

export { BoolMod };