import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';
import React from 'react';

export class MailToMod extends UrbanTableMod {
	constructor(columns) {
		super(Targets.DATA_VALUE, { columnId: [].concat(columns)}, '', null, null,
			item => (
				<a href={"mailto:" + item.value} target="_top"
				   className={['utable--data-cell--value', ...item.classNames].join(' ')}
				   onClick={() => {
					   item.onClicks.map(onClickFunc => onClickFunc(item));
				   }}
				>
					{(item.displayValue || item.value)}
				</a>
			)
		);
	}
}