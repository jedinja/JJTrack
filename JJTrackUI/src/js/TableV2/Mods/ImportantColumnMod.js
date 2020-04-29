import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

export class ImportantColumnMod extends UrbanTableMod {
	constructor(importantColumns) {
		super(Targets.DATA_CELL, { columnId: [].concat(importantColumns) }, 'important');
	}
}

export class ImportantFilteredColumnMod extends UrbanTableMod {
	constructor(importantColumns, filter, customClassName) {
		super(Targets.DATA_CELL, item => importantColumns.indexOf(item.columnId) > -1 && filter(item), customClassName);
	}
}
