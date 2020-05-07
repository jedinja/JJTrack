import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';
import moment from 'moment';

class DateMod extends UrbanTableMod {
	constructor(dateColumns, itemIndex) {
		super(Targets.DATA_VALUE, { columnId: [].concat(dateColumns), itemIndex }, [], null,
			d => moment(d).format('DD MMM YYYY'));
	}
}

export default DateMod;