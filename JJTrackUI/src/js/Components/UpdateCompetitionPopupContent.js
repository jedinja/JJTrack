import React from 'react';
import PopupHeading from './PopupHeading';
import PopupInput from './PopupInput';
import PopupButton from './PopupButton';

export class UpdateCompetitionPopupContent extends  React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			eventDate: '',
			duration: '',
		};
	}

	componentDidMount() {
		console.log(this.props);
		this.setState({
			name: this.props.name,
			eventDate: this.props.eventDate.substring(0, 10),
			duration: this.props.duration,
		})
	}

	change = (name, e) => this.setState({ [name]: e.target.value })

	changeName = this.change.bind(this, 'name');
	changeDate = this.change.bind(this, 'eventDate');
	changeDuration = this.change.bind(this, 'duration');

	update = () => {
		if(this.state.name && this.state.eventDate && this.state.duration) {
			this.props.update(this.state.name, this.state.eventDate, this.state.duration);
			this.props.close();
		}
	}

	render() {
		let { name, eventDate, duration } = this.state;
		return (
			<div className="new-member popup-frame-content">
				<PopupHeading text="Update Competition" />
				<PopupInput text="Name" value={name} change={this.changeName}/>
				<PopupInput text="Event Date" value={eventDate} change={this.changeDate} type="date"/>
				<PopupInput text="Duration (m)" value={duration} change={this.changeDuration} type="number"/>
				<PopupButton text="Update" click={this.update} />
			</div>
		);
	}
}