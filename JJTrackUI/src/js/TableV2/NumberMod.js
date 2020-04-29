import UrbanTableMod from './Modding/UrbanTableMod';
import {DATA_CELL, DATA_VALUE} from './Modding/ModTargets';
import { numberFormat } from '../Libs/libs';
import {formatValueModFunc} from './Mods/FormatValueMod';

class NumberMod extends UrbanTableMod {
	constructor(numberColumns, maskOrFunc, itemIndex = 0, target = DATA_VALUE) {
		super(target, { columnId: [].concat(numberColumns), itemIndex}, ['right-aligned'], null,
			val => formatValueModFunc(maskOrFunc, val !== null ? numberFormat(val) : val))
	}
}

export default NumberMod;

export class NumberCellPosition extends UrbanTableMod {
	constructor (numberColumns, target = DATA_CELL, rowIndex) {
		super(target, { columnId: [].concat(numberColumns), rowIndex }, ['right-aligned']);
	}
}