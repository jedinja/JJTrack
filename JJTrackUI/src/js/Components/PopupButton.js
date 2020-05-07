import React from 'react';

export default ({ text, click }) => (
	<div className="popup-row">
		<span className="popup-button" onClick={click}>{ text }</span>
	</div>
)