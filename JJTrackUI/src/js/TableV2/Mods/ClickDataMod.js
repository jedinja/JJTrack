
import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

class ClickDataMod extends UrbanTableMod {
	constructor(columns, clickAction, rowId) {
		super(Targets.DATA_CELL, { columnId: [].concat(columns), rowId }, 'clickable', clickAction);
	}
}

export class ClickHeaderMod extends UrbanTableMod {
	constructor(columns, clickAction) {
		super(Targets.HEADER_CELL, { columnId: [].concat(columns) }, 'clickable', clickAction);
	}
}

export default ClickDataMod;