import React from 'react';
import {Transfer} from '../../Components/HOCs/Transfer';
import {PickPopup} from '../../Components/Modals/PickPopup';
import {MessageModal} from '../../Components/Modals/MessageModal';
import UrbanTableMod from '../Modding/UrbanTableMod';
import {DATA_CELL} from '../Modding/ModTargets';

export class TruncatedColumnMod extends UrbanTableMod {
	constructor(columns) {
		super(DATA_CELL, { columnId: [].concat(columns)}, ['truncated', 'clickable'], undefined, undefined,
			(cell, children) => (
				<PickPopup
					trigger={<span>{children}</span>}
					popupContent={Transfer({ message: cell.items[0].displayValue || cell.items[0].value }, MessageModal)}
				/>
			)
		);
	}
}
