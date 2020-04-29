import React from 'react';
import {DATA_VALUE} from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

export class CellEnumMod extends UrbanTableMod {
	constructor(columns, rowId, changeValue, enumTextMap) {
		super(DATA_VALUE, { columnId: [].concat(columns), rowId },
			'cell-input-value', null, null,
			item => {
				return (
					<React.Fragment>
						{
							enumTextMap.map(({ value, text }) => (
								<span
									className={["utable--data-cell--value enum-value", ...item.classNames, item.value === value ? 'enum-value-selected' : ''].join(' ')}
									onClick={changeValue.bind(this, item, value)}
									key={value}
								>
									{ text }
								</span>
							))
						}
					</React.Fragment>
			)},
		);
	}
}