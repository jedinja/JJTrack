import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

export class EnumFormatMod extends UrbanTableMod {
	constructor(columns, enumTextMap, itemIndex, target = Targets.DATA_VALUE) {
		super(target, { columnId: [].concat(columns), itemIndex }, '', null,
				val => enumTextMap.find(v => v.value === val) ? enumTextMap.find(v => v.value === val).text : ' ');
	}
}