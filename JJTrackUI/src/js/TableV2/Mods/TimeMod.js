import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

class TimeMod extends UrbanTableMod {
	constructor(dateColumns, itemIndex) {
		super(Targets.DATA_VALUE, { columnId: [].concat(dateColumns), itemIndex }, [], null,
			mins => {
				if(mins % 60 === 0) {
					let hours = mins / 60;

					if(hours % 24 === 0) {
						return `${hours / 24}d`
					} else {
						return `${hours}h`
					}
				} else {
					return `${mins}m`
				}
			});
	}
}

export default TimeMod;