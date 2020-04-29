import React from 'react';
import UrbanTableMod from '../Modding/UrbanTableMod';
import {DATA_VALUE} from '../Modding/ModTargets';
import {Rating} from '../../Components/Rating';

export default class RatingMod extends UrbanTableMod {
	constructor(columns, itemIndex = 0){
		super(DATA_VALUE, { columnId: [].concat(columns), itemIndex }, [], null, null,
			cellItem => (
				<Rating
					value={cellItem.value}
					valueChanged={ cellItem.onClicks.length ? ((value) => cellItem.onClicks.map(onClickFunc => onClickFunc(cellItem, value))) : null}
				/>
			)
		)
	}
}