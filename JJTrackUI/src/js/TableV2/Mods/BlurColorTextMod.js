import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';

class BlurColorTextMod extends UrbanTableMod {
	constructor(dateColumns, itemIndex) {
		super(Targets.DATA_VALUE, { columnId: [].concat(dateColumns), itemIndex }, ['color-blur']);
	}
}

export default BlurColorTextMod;