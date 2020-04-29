import React from 'react';
import FooterCell from './FooterCell';

let FooterRow = ( { row } ) =>
	(
		<tr className = {["utable--footer-row", ...row.classNames].join(' ')}
		    onClick={() => { row.onClicks.map( onClickFunc => onClickFunc(row)) }}>
			{ row.map( (cell, index) => (
				<FooterCell
					key = { cell ? cell.columnId : index }
					cell = { cell }
				/>
			) )}
		</tr>
	);

export default FooterRow;

