import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';
import {dateFormat} from '../../Libs/libs';

class DateMod extends UrbanTableMod {
	constructor(dateColumns) {
		super(Targets.DATA_VALUE, { columnId: [].concat(dateColumns) }, [], null,
			dateFormat);
	}
}

export default DateMod;