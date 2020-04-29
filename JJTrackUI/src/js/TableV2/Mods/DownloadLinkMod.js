import React from 'react';
import UrbanTableMod from '../Modding/UrbanTableMod';
import {DATA_VALUE} from '../Modding/ModTargets';

export class DownloadLinkMod extends UrbanTableMod {
	constructor(importantColumns) {
		super(DATA_VALUE, { columnId: [].concat(importantColumns) }, '', null, null,
			item => (
				<a target="_blank" href={item.value} className={['utable--data-cell--value', ...item.classNames].join(' ')} />
			),
		);
	}
}