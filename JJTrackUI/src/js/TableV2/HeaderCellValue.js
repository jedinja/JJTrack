import React from 'react';

let HeaderCellValue = ( { item, children } ) => {
	if (item.renderer) {
        return item.renderer(item);
	} else {
		return (
            <span
				className = {["utable--header-cell--value", ...item.classNames].join(' ')}
				onClick = { () => { item.onClicks.map( onClickFunc => onClickFunc(item)) }}
			>
				{ item.displayValue || item.value }
	            { children }
			</span>
		);
	}
};

export default HeaderCellValue;