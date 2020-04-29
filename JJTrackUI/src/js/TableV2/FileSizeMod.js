import UrbanTableMod from './Modding/UrbanTableMod';
import {DATA_VALUE} from './Modding/ModTargets';
import {calcFileSize} from '../Libs/libs';

class FileSizeMod extends UrbanTableMod {
	constructor(columns) {
		super(DATA_VALUE, { columnId: [].concat(columns) }, ['right-aligned'], null,
			val => calcFileSize(val));
	}
}

export default FileSizeMod;