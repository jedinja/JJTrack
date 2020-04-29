
import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

class ClickDataMod extends UrbanTableMod {
	constructor(columns, clickAction, rowId) {
		super(Targets.DATA_CELL, { columnId: [].concat(columns), rowId }, 'clickable', clickAction);
	}
}

export default ClickDataMod;

export class ClickDataWhenValueMod extends UrbanTableMod {
	constructor(columns, filter, clickAction) {
		super(Targets.DATA_CELL, item => columns.indexOf(item.columnId) > -1 && filter(item), 'clickable', clickAction);
	}
}