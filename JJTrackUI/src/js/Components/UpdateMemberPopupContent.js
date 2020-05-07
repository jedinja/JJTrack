import React from 'react';
import PopupHeading from './PopupHeading';
import PopupInput from './PopupInput';
import PopupButton from './PopupButton';
import PopupInputSelect from './PopupInputSelect';
import {selectItems} from '../lib';

export class UpdateMemberPopupContent extends  React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			active: false,
		};
	}

	componentDidMount() {
		this.setState({
			name: this.props.name,
			active: this.props.active,
		})
	}

	changeName = e => this.setState({ name: e.target.value });
	changeActive = e => this.setState({ active: e.target.value });

	update = () => {
		if(this.state.name) {
			this.props.update(this.state.name, this.state.active);
			this.props.close();
		}
	}

	render() {
		let { name, active } = this.state;
		return (
			<div className="new-member popup-frame-content">
				<PopupHeading text="Update Member" />
				<PopupInput text="Name" value={name} change={this.changeName}/>
				<PopupInputSelect text="Active" value={active} change={this.changeActive} items={selectItems([
					'Yes', true, 'No', false
				])}/>
				<PopupButton text="Update" click={this.update} />
			</div>
		);
	}
}