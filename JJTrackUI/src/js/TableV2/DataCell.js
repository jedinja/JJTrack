import React from 'react';
import DataCellValue from './DataCellValue';

let CellValues = (cell) => {
    return cell.items.map((item, index) => (
		<DataCellValue
			key = { index }
			item = { item }
		/>
    ));
};

let DataCell = ( { cell } ) => {
	if ( !cell ) {
		return null;
	}

	let mouseEnterFns = cell.mouseEventsHandlers.mouseEnter;
	let mouseLeaveFns = cell.mouseEventsHandlers.mouseLeave;
	let mouseEnterHandler = mouseEnterFns.length ? () => {  mouseEnterFns.map(onMouseEnter => onMouseEnter(cell)) } : null ;
	let mouseLeaveHandler = mouseLeaveFns.length ? () => {  mouseLeaveFns.map(onMouseLeave => onMouseLeave(cell)) } : null;
	let clickHandler = cell.onClicks.length ? (ev) => { cell.onClicks.map(onClickFunc => onClickFunc(cell,ev)) } : null;

	return (
		<td className={["utable--data-cell", ...cell.classNames].join(' ')}
			onClick={clickHandler}
			onMouseEnter={mouseEnterHandler}
			onMouseLeave={mouseLeaveHandler}
		>
			{ (cell.renderer) ? cell.renderer(cell, CellValues(cell)) : CellValues(cell) }
		</td>
    );
}

export default DataCell;
