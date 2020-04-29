import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

export class TableIconMod extends UrbanTableMod {
	constructor(importantColumns, icon, rowId) {
		super(Targets.DATA_VALUE, { columnId: [].concat(importantColumns), rowId }, ['icon', icon]);
	}
}

export class TableIconContainerMod extends UrbanTableMod {
	constructor(importantColumns, rowId) {
		super(Targets.DATA_CELL, { columnId: [].concat(importantColumns), rowId }, ['icon-container']);
	}
}

export function getTableIconMods (columns, icon, rowId) {
	return [
		new TableIconMod(columns, icon, rowId),
		new TableIconContainerMod(columns, rowId),
	];
}
