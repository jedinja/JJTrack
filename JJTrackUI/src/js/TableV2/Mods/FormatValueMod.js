import React from 'react';
import {DATA_VALUE} from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

export const formatValueModFunc = (maskOrFunc = id => id, value) => {
	if (typeof maskOrFunc === 'function') {
		return maskOrFunc(value);
	} else if (value !== null && value !== undefined && value !== '') {
		return maskOrFunc.replace('{@@@}', value);
	}
};

export class FormatValueMod extends UrbanTableMod {
	constructor(columns, maskOrFunc) {
		super(DATA_VALUE, { columnId: [].concat(columns) }, null, null,
			value => formatValueModFunc(maskOrFunc, value)
		);
	}
}