import React from 'react';
import PopupHeading from './PopupHeading';
import PopupInput from './PopupInput';
import PopupButton from './PopupButton';

export class NewMemberPopupContent extends  React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
		};
	}

	changeName = e => this.setState({ name: e.target.value });

	add = () => {
		if(this.state.name) {
			this.props.add(this.state.name);
			this.props.close();
		}
	}

	render() {
		let { name } = this.state;
		return (
			<div className="new-member popup-frame-content">
				<PopupHeading text="New Member" />
				<PopupInput text="Name" value={name} change={this.changeName}/>
				<PopupButton text="Add" click={this.add} />
			</div>
		);
	}
}