import React from 'react';
import HeaderCellValue from './HeaderCellValue';

let CellValues = (cell) => {
    return cell.items.map((item, index) => (
		<HeaderCellValue
			key = { index }
			item = { item }
		/>
    ));
};

let HeaderCell = ( { cell } ) => !cell ? null :
	(
		<th className={["utable--header-cell", ...cell.classNames].join(' ')}
			onClick={() => { cell.onClicks.map( onClickFunc => onClickFunc(cell)) }}
		>
            { (cell.renderer) ? cell.renderer(cell, CellValues(cell)) : CellValues(cell) }
		</th>
	);

export default HeaderCell;

