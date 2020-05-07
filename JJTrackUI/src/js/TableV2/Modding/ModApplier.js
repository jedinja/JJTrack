import * as Target from './ModTargets';
/**
 * dataGrid is basic 2D grid with values and rowIds
 *
 * mods is an array of mods defined as follows: {
	 *     targetComponent: ['cell', 'headercell', 'datacell', 'row', 'headerrow', 'datarow']
	 *     selector: [undefined/all, ([cell,row]) => bool]
	 *     transform: {
	 *         classNames: [],
	 *         onClick: function,
	 *     }
	 * }
 *
 * returns structure [
 *     [
 *         {
	 *             value:
	 *             className:
	 *             onClick:
	 *             rowIndex:
	 *             columnIndex:
	 *         },
 *     ],
 * ]
 */
class ModApplier {

	constructor() {
		this.availableTargets = Object.keys(Target).map(key => Target[key]); // All defined values

		this.verifyModsIntegrity = this.verifyModsIntegrity.bind(this);
		this.getMods = this.getMods.bind(this);
	}

	getMods(mods, targetArray, component) {

		let invokeSelector = (mod, component) => {
			switch (typeof mod.selector) {
				case 'undefined': {
					return true;
				}
				case 'function': {
					return mod.selector(component);
				}
				case 'object': {
					return Object.keys(mod.selector).filter(key => mod.selector[key] !== undefined).reduce((result, filterField) => {
						let filterValue = Array.isArray(mod.selector[filterField]) ? mod.selector[filterField] : [mod.selector[filterField]];
						return result && (filterValue.indexOf(component[filterField]) >= 0);
					}, true);
				}
			}
		};

		return mods.filter(mod => targetArray.indexOf(mod.target) >= 0 && invokeSelector(mod, component));
	}

	verifyModsIntegrity(mods) {
		if (mods) {
			let invalidTargetsMods = mods.filter(mod => !mod.target || this.availableTargets.indexOf(mod.target) < 0);

			if (invalidTargetsMods.length) {
				console.warn('Some of the defined mods have invalid target:', invalidTargetsMods,
					'Allowed target types are: ', this.availableTargets);
			}
		}
	}

	generateHeaderRows(dataGrid, mods, columnKeys) {
		return this.generateViewSource(
			dataGrid,
			mods,
			[Target.HEADER_ROW, Target.ROW],
			[Target.HEADER_CELL, Target.CELL],
			[Target.HEADER_VALUE, Target.VALUE],
			columnKeys,
		);
	}

	generateDataRows(dataGrid, mods, columnKeys) {
		return this.generateViewSource(
			dataGrid,
			mods,
			[Target.DATA_ROW, Target.ROW],
			[Target.DATA_CELL, Target.CELL],
			[Target.DATA_VALUE, Target.VALUE],
			columnKeys,
		);
	}

	generateFooterRows(dataGrid, mods, columnKeys) {
		return this.generateViewSource(
			dataGrid,
			mods,
			[Target.FOOTER_ROW, Target.ROW],
			[Target.FOOTER_CELL, Target.CELL],
			[Target.FOOTER_VALUE, Target.VALUE],
			columnKeys,
		);
	}

	generateViewSource(dataGrid, mods, rowModTargets, cellModTargets, cellValueModTargets, columnKeys) {
		this.verifyModsIntegrity(mods);

		let rows = [];

		for (let rowIndex = 0; rowIndex < dataGrid.length; rowIndex++) {

			let sourceRow = dataGrid[rowIndex];

			// create row and apply row mods
			let row = this.generateRow(sourceRow, rowIndex, mods, rowModTargets);
			rows.push(row);

			// create row cells and apply cell mods
			for (let cellIndex = 0; cellIndex < sourceRow.length; cellIndex++) {


				// create cell values and apply mods
				let cellValues =[].concat(sourceRow[cellIndex]); // parse to array
				let cellItems = [];
				for (let itemIndex = 0; itemIndex < cellValues.length; itemIndex++) {

					let item = this.generateCellItem(cellValues[itemIndex], columnKeys[cellIndex], cellIndex, sourceRow.rowId, rowIndex, itemIndex, mods, cellValueModTargets);
					cellItems.push(item);
				}

				let cell = this.generateCell(cellItems, columnKeys[cellIndex], cellIndex, sourceRow.rowId, rowIndex, mods, cellModTargets);
				row.push(cell);
			}
		}

		return rows;
	}

	generateRow(sourceRow, rowIndex, mods, modTargets) {

		let row = [];
		row.rowKey = sourceRow.rowId || rowIndex;
		row.index = rowIndex;

		let rowMods = this.getMods(mods, modTargets, row);
		let { classNames, onClicks, mouseEventsHandlers } = ModApplier.reduceModsClassNamesAndClicks(rowMods);

		row.classNames = classNames;
		row.onClicks = onClicks;
        row.mouseEventsHandlers = mouseEventsHandlers;

		return row;
	}

	generateCell (items, columnId, columnIndex, rowId, rowIndex, mods, modTargets) {

		let cell = { rowIndex, columnIndex, rowId, columnId, items };

		let cellMods = this.getMods(mods, modTargets, cell);
		let { classNames, onClicks, mouseEventsHandlers } = ModApplier.reduceModsClassNamesAndClicks(cellMods);

		if (classNames.includes('hidden')) {
			return null;
		}

		cell.classNames = classNames;
		cell.onClicks = onClicks;
		cell.mouseEventsHandlers = mouseEventsHandlers;

        let cellRenderMod = cellMods.find(mod => mod.transform.renderer);
        if (cellRenderMod) {
            cell.renderer = cellRenderMod.transform.renderer;
        }

		return cell;
	}

	generateCellItem(value, columnId, columnIndex, rowId, rowIndex, itemIndex, mods, modTargets) {
		let item = { rowIndex, columnIndex, rowId, columnId, itemIndex, value };

		let itemMods = this.getMods(mods, modTargets, item);
		let { classNames, onClicks, mouseEventsHandlers } = ModApplier.reduceModsClassNamesAndClicks(itemMods);

		item.classNames = classNames;
		item.onClicks = onClicks;
        item.mouseEventsHandlers = mouseEventsHandlers;

		let itemFormatterMod = itemMods.find(mod => mod.transform.formatter);
		if (itemFormatterMod) {
			item.displayValue = itemFormatterMod.transform.formatter(item.value);
		}

        let itemRenderMod = itemMods.find(mod => mod.transform.renderer);
        if (itemRenderMod) {
            item.renderer = itemRenderMod.transform.renderer;
        }

		return item;
	}

	static reduceModsClassNamesAndClicks(mods) {
		return mods.reduce((result, item) => {

			if (item.transform.classNames && item.transform.classNames.length) {
				result.classNames = result.classNames.concat(item.transform.classNames);
			}
			if (item.transform.onClick) {
				result.onClicks.push(item.transform.onClick);
			}

			let mouseEventsHandler = item.transform.mouseEventsHandler;
            if (mouseEventsHandler) {
                mouseEventsHandler.mouseEnter && result.mouseEventsHandlers.mouseEnter.push(mouseEventsHandler.mouseEnter);
                mouseEventsHandler.mouseLeave && result.mouseEventsHandlers.mouseLeave.push(mouseEventsHandler.mouseLeave);
            }
			return result;

		}, {
			classNames: [],
			onClicks: [],
			mouseEventsHandlers: {
				mouseEnter : [],
				mouseLeave : []
			}
		});
	}
}

export default ModApplier;
