import React from 'react';

export const Icons = {
	june: "data:image/jpeg;base64,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",
};

export default ({ icon, className, onClick }) => (<img className={'icon ' + className} src={icon} alt={'info'} onClick={onClick} />)