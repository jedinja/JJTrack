import React from 'react';
import PopupHeading from './PopupHeading';
import PopupInput from './PopupInput';
import PopupButton from './PopupButton';

export class NewCompetitionPopupContent extends  React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			eventDate: '',
			duration: '',
		};
	}

	change = (name, e) => this.setState({ [name]: e.target.value })

	changeName = this.change.bind(this, 'name');
	changeDate = this.change.bind(this, 'eventDate');
	changeDuration = this.change.bind(this, 'duration');

	add = () => {
		if(this.state.name && this.state.eventDate && this.state.duration) {
			this.props.add(this.state.name, this.state.eventDate, this.state.duration);
			this.props.close();
		}
	}

	render() {
		let { name, eventDate, duration } = this.state;
		return (
			<div className="new-member popup-frame-content">
				<PopupHeading text="New Competition" />
				<PopupInput text="Name" value={name} change={this.changeName}/>
				<PopupInput text="Event Date" value={eventDate} change={this.changeDate} type="date"/>
				<PopupInput text="Duration (m)" value={duration} change={this.changeDuration} type="number"/>
				<PopupButton text="Add" click={this.add} />
			</div>
		);
	}
}