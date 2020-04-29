import React from 'react';
import {DATA_CELL, DATA_VALUE} from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';
import { Focusable } from '../../Components/HOCs/Focused';

const Focus = Focusable('input');

export class CellInputMod extends UrbanTableMod {
	constructor(columns, rowId, changeValue, type = 'number') {
		super(DATA_VALUE, { columnId: [].concat(columns), rowId },
			'cell-input-value', null, null,
			item => {
			let props = type === "number" ? { min: 0, max: 100,	step: 0.01 } : {};
			return (
				<Focus
					type={type}
					className={["utable--data-cell--value", ...item.classNames].join(' ')}
					onChange={e => changeValue(item, e.target.value)}
					value={item.value}// ignore item.displayValue
					{...props}
				/>
			)},
		);
	}
}

export class CellInputContainerMod extends UrbanTableMod {
	constructor(columns, rowId) {
		super(DATA_CELL, { columnId: [].concat(columns), rowId}, 'cell-input-container');
	}
}