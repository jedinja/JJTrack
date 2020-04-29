import React from 'react';

let FooterCell = ( { cell } ) => !cell ? null :
	(
		<td className={["utable--footer-cell", ...cell.classNames].join(' ')}
			onClick={() => { cell.onClicks.map( onClickFunc => onClickFunc(cell)) }}>
			{
				cell.items.map((item, index) => (
					<span
						key = { index }
						className = {["utable--footer-cell--value", ...item.classNames].join(' ')}
						onClick = { () => { item.onClicks.map( onClickFunc => onClickFunc(item)) }}
					>
						{ item.displayValue || item.value }
					</span>
				))
			}
		</td>
	);

export default FooterCell;

