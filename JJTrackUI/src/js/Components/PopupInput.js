import React from 'react';

export default ({ text, value, change, type }) => (
	<div className="popup-input">
		<span className="popup-input-text">{ text }</span>
		<input className="popup-input-value" onChange={change} value={value} type={type || "text"}/>
	</div>
)