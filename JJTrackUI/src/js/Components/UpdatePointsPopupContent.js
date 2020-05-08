import React from 'react';
import PopupHeading from './PopupHeading';
import PopupInput from './PopupInput';
import PopupButton from './PopupButton';

export class UpdatePointsPopupContent extends  React.Component {

	constructor(props) {
		super(props);

		this.state = {
			points: '',
		};
	}

	componentDidMount() {
		this.setState({
			points: this.props.points,
		})
	}

	changePoints = e => this.setState({ points: e.target.value });

	update = () => {
		if(this.state.points) {
			this.props.update(this.state.points);
			this.props.close();
		}
	}

	render() {
		let { points } = this.state;
		return (
			<div className="new-member popup-frame-content">
				<PopupHeading text="Competition Result" />
				<PopupInput text="Points" value={points} change={this.changePoints} type="number"/>
				<PopupButton text="Update" click={this.update} />
			</div>
		);
	}
}