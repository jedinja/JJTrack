import React from 'react';
import DataCell from './DataCell';

let HeaderRow = ( { row } ) =>
	(
		<tr className = {["utable--data-row", ...row.classNames].join(' ')}
		    onClick={() => { row.onClicks.map( onClickFunc => onClickFunc(row)) }}>
			{ row.map( (cell, index) => (
				<DataCell
					key = { cell ? cell.columnIndex : index }
					cell = { cell }
				/>
			) )}
		</tr>
	);

export default HeaderRow;
