import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';

export class PickPopup extends React.Component {
	render() {

		let PopupContent = this.props.popupContent;

		return (
			!this.props.readonly ? (
				<Popup
					trigger={this.props.trigger}
					modal
					className={"modal-popup-content" + (this.props.embed ? ' embed' : '')}
					open={this.props.open || false}
					onClose={this.props.onClose}
				>
					{ close => (
						<div className="popup-frame">
							<PopupContent close={close}/>
						</div>
					)}
				</Popup>
			) : this.props.trigger
		);
	}
}

PickPopup.propTypes = {
	trigger: PropTypes.any.isRequired,
	popupContent: PropTypes.any.isRequired,
	readonly: PropTypes.bool,
	embed: PropTypes.bool,
};

PickPopup.defaultProps = {
	readonly: false,
	embed: false,
};

export const Transfer = (props, Component) => class TransferClass extends React.Component {
	render(){
		return (
			<Component {...props} {...this.props} />
		);
	}
};