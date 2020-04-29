import React from 'react';

let DataCellValue = ( { item } ) => {
	if (item.renderer) {
        return item.renderer(item);
	} else {
		return (
			<span
				className={["utable--data-cell--value", ...item.classNames].join(' ')}
				onClick={ () => {
					item.onClicks.map(onClickFunc => onClickFunc(item))
				}}
			>
				{ (item.displayValue || item.value) }
			</span>
		);
	}
};

export default DataCellValue;