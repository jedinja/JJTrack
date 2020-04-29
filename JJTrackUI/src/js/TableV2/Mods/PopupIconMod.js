import {TableIconContainerMod} from './TableIconMod';
import * as Targets from '../Modding/ModTargets';
import UrbanTableMod from '../Modding/UrbanTableMod';
import React from 'react';
import DataCellValue from '../DataCellValue';
import {PickPopup} from '../../Components/Modals/PickPopup';
import {Transfer} from '../../Components/HOCs/Transfer';

class TransferClick extends React.Component {
	render () {

		return <DataCellValue item={{...this.props.item, onClicks: [...this.props.item.onClicks, this.props.onClick]}}/>
	}
}

export class PopupIconMod extends UrbanTableMod {
	constructor(columns, icon, rowId, PopupContent, pick) {
		super(Targets.DATA_VALUE, { columnId: [].concat(columns), rowId }, icon ? ['icon', icon] : ['clickable'], null, null,
			item => (
				<PickPopup
					trigger={
						<TransferClick item={{...item, renderer: null}} />
					}
					popupContent={
						Transfer({ pick: pick.bind(this, item)}, PopupContent)
					}
				/>
			)
		)
	}
}

export const getPopupIconMods = (columns, icon, rowId, popup, pick) => [
	new PopupIconMod(columns, icon, rowId, popup, pick),
	new TableIconContainerMod(columns, rowId),
];