import React from 'react';
import UrbanTable from '../TableV2/UrbanTable';

import { connect } from 'react-redux';
import {
	LOAD_MEMBERS, act, ADD_MEMBER, ADD_COMPETITIOIN, LOAD_COMPETITION,
} from '../Actions/ActionNames';
import {history} from '../Routing/History';
import {Routes} from '../Routing/Routes';
import Icon, { Icons } from './Icon';
import {PickPopup, Transfer} from './PickPopup';
import {NewMemberPopupContent} from './NewMemberPopupContent';
import {MemberClient} from '../Rest/MemberClient';
import {
	_id, _recProp,
	chainSorting,
	DESC,
	emptyGrid,
	gridRow,
	recSort,
	recStringSort,
} from '../lib';
import {NewCompetitionPopupContent} from './NewCompetitionPopupContent';
import {CompetitionClient} from '../Rest/CompetitionClient';
import DateMod from '../TableV2/Mods/DateMod';
import TimeMod from '../TableV2/Mods/TimeMod';
import BlurColorTextMod from '../TableV2/Mods/BlurColorTextMod';

const CLM_COMPETITION = 'CLM_COMPETITION';

class mainPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			gridSource: emptyGrid(),
		};
	}

	componentDidMount () {
		this.props.load();
	}

	componentWillReceiveProps (nextProps, nextContext) {
		if(nextProps.members !== this.props.members || this.props.competitions !== nextProps.competitions) {
			this.generateGridSource(nextProps);
		}
	}

	generateGridSource = (props) => {

		let orderedMembers = [...props.members].sort(chainSorting([recSort('Active', DESC), recStringSort('Added')]));
		let orderedCompetitions = [...props.competitions].sort(recStringSort('EventDate', DESC));

		this.setState({ gridSource : {
			columnKeys: [CLM_COMPETITION].concat(orderedMembers.map(_id)),
			headers: [['Competitions'].concat(orderedMembers.map(_recProp('Name')))],
			footers: [],
			mods: [
				new DateMod(CLM_COMPETITION, 0),
				new TimeMod(CLM_COMPETITION, 1),
				new BlurColorTextMod(CLM_COMPETITION, 1),
			],
			data: orderedCompetitions.map(comp => gridRow(_id(comp), [
				[_recProp('EventDate')(comp), _recProp('Duration')(comp)]
			]))
		}});
	}

	render() {
		const { gridSource } = this.state;
		const { addMember, addCompetition } = this.props;

		return (
			<div className="main-page">
				<div className="menu">
					<PickPopup
						trigger={
							<Icon icon={Icons.june} className="add-member" />
						}
						popupContent={
							Transfer({ add: addMember }, NewMemberPopupContent)
						}
					/>
					<PickPopup
						trigger={
							<Icon icon={Icons.compass} className="add-competition" />
						}
						popupContent={
							Transfer({ add: addCompetition }, NewCompetitionPopupContent)
						}
					/>
				</div>

				<div className="table-container">
					<UrbanTable {...gridSource} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		members: state.members,
		competitions: state.competitions,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		load: () => Promise.all([
			MemberClient.get('').then(data => dispatch(act(LOAD_MEMBERS, data))),
			CompetitionClient.get('').then(data => dispatch(act(LOAD_COMPETITION, data))),
		]),
		addMember: Name => MemberClient.post({ Name }).then(data => dispatch(act(ADD_MEMBER, data))),
		addCompetition: (Name, EventDate, DUration) => CompetitionClient.post({ Name, EventDate, DUration }).then(data => dispatch(act(ADD_COMPETITIOIN, data))),
	};
};

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(mainPage);