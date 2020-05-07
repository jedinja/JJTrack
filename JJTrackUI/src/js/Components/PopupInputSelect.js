import React from 'react';

export default ({ text, value, change, items }) => (
	<div className="popup-input">
		<span className="popup-input-text">{ text }</span>
		<select className="popup-input-value" onChange={change} value={value}>
			{
				items.map(it => (
					<option key={it.value} value={it.value}>
						{ it.text }
					</option>
				))
			}
		</select>
	</div>
)