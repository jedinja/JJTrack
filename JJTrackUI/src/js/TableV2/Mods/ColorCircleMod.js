import React from 'react';
import UrbanTableMod from '../Modding/UrbanTableMod';
import {DATA_VALUE} from '../Modding/ModTargets';

export class ColorCodeMod extends UrbanTableMod {
	constructor(importantColumns) {
		super(DATA_VALUE, { columnId: [].concat(importantColumns), itemIndex: 0 }, '', null, null,
			item => (
				<span className={['utable--data-cell--value', ...item.classNames].join(' ')}>
					<div className={`circle ${item.value}`}>&nbsp;</div>
				</span>
			),
		);
	}
}