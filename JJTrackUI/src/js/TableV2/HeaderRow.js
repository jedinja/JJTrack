import React from 'react';
import HeaderCell from './HeaderCell';

let HeaderRow = ( { row } ) =>
	(
		<tr className = {["utable--header-row", ...row.classNames].join(' ')}
		    onClick={() => { row.onClicks.map( onClickFunc => onClickFunc(row)) }}>
			{ row.map( (cell, index) => (
				<HeaderCell
					key = { cell ? cell.columnId : index }
					cell = { cell }
				/>
			) )}
		</tr>
	);

export default HeaderRow;

