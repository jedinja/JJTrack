import React from 'react';
import UrbanTable from '../TableV2/UrbanTable';

import { connect } from 'react-redux';
import {
	LOAD_MEMBERS, act, ADD_MEMBER, ADD_COMPETITIOIN, LOAD_COMPETITION, LOAD_RECORD, UPDATE_MEMBER, UPDATE_COMPETITIOIN,
} from '../Actions/ActionNames';
import {history} from '../Routing/History';
import {Routes} from '../Routing/Routes';
import Icon, { Icons } from './Icon';
import {PickPopup, Transfer} from './PickPopup';
import {NewMemberPopupContent} from './NewMemberPopupContent';
import {MemberClient} from '../Rest/MemberClient';
import {
	_id, _rec, _recProp,
	chainSorting,
	DESC,
	emptyGrid, fromGroup,
	gridRow,
	recSort,
	recStringSort,
} from '../lib';
import {NewCompetitionPopupContent} from './NewCompetitionPopupContent';
import {CompetitionClient} from '../Rest/CompetitionClient';
import DateMod from '../TableV2/Mods/DateMod';
import TimeMod from '../TableV2/Mods/TimeMod';
import BlurColorTextMod from '../TableV2/Mods/BlurColorTextMod';
import {RecordClient} from '../Rest/RecordClient';
import {MiddleAlignMod} from '../TableV2/Mods/MiddleAlignMod';
import ClickDataMod, {ClickHeaderMod} from '../TableV2/Mods/ClickDataMod';
import {UpdateMemberPopupContent} from './UpdateMemberPopupContent';
import {InactiveColumnMod} from '../TableV2/Mods/InactiveColumnMod';
import {UpdateCompetitionPopupContent} from './UpdateCompetitionPopupContent';

const CLM_COMPETITION = 'CLM_COMPETITION';

class mainPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			gridSource: emptyGrid(),
			showUpdateMember: false,
			updatingMember: null,
			showUpdateComp: false,
			updatingComp: null,
		};
	}

	componentDidMount () {
		this.props.load();
	}

	componentWillReceiveProps (nextProps, nextContext) {
		if(nextProps.members !== this.props.members ||
			this.props.competitions !== nextProps.competitions ||
			this.props.records !== nextProps.records)
		{
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
				new MiddleAlignMod(orderedMembers.map(_id)),
				new ClickHeaderMod(orderedMembers.map(_id), this.onMemberClick),
				new InactiveColumnMod(orderedMembers.filter(mem => _recProp('Active')(mem) === false).map(_id)),
				new ClickDataMod(CLM_COMPETITION, this.onCompClick),
			],
			data: orderedCompetitions.map(comp => gridRow(_id(comp), [
				[_recProp('EventDate')(comp), _recProp('Duration')(comp)],
				...orderedMembers.map(member => fromGroup(props.records, [
					_id(comp), _id(member), 0, _rec, 'Points'
				], '---'))
			]))
		}});
	}

	onMemberClick = cell => this.setState({
		showUpdateMember: true,
		updatingMember: cell.columnId,
	});

	onCompClick = cell => this.setState({
		showUpdateComp: true,
		updatingComp: cell.rowId,
	});

	render() {
		const { gridSource, showUpdateMember, updatingMember, showUpdateComp, updatingComp } = this.state;
		const { addMember, updateMember, addCompetition, updateCompetition, members, competitions } = this.props;

		let member = showUpdateMember && members.find(m => _id(m) === updatingMember);
		let comp = showUpdateComp && competitions.find(c => _id(c) === updatingComp);

		return (
			<div className="main-page">
				{
					showUpdateMember && (
						<PickPopup
							trigger={<a/>}
							onClose={() => this.setState({ showUpdateMember: false, updatingMember: null})}
							open={true}
							popupContent={
								Transfer({
									update: updateMember.bind(this, updatingMember),
									name: _recProp('Name')(member),
									active: _recProp('Active')(member)
								}, UpdateMemberPopupContent)
							}
						/>
					)
				}
				{
					showUpdateComp && (
						<PickPopup
							trigger={<a/>}
							onClose={() => this.setState({ showUpdateComp: false, updatingComp: null})}
							open={true}
							popupContent={
								Transfer({
									update: updateCompetition.bind(this, updatingComp),
									name: _recProp('Name')(comp),
									eventDate: _recProp('EventDate')(comp),
									duration: _recProp('Duration')(comp),
								}, UpdateCompetitionPopupContent)
							}
						/>
					)
				}

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
		records: state.records,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		load: () => Promise.all([
			MemberClient.get('').then(data => dispatch(act(LOAD_MEMBERS, data))),
			CompetitionClient.get('').then(data => dispatch(act(LOAD_COMPETITION, data))),
			RecordClient.get('').then(data => dispatch(act(LOAD_RECORD, data))),
		]),
		addMember: Name => MemberClient.post({ Name }).then(data => dispatch(act(ADD_MEMBER, data))),
		updateMember: (id, Name, Active) => MemberClient.put({ Name, Active }, id).then(data => dispatch(act(UPDATE_MEMBER, data))),
		addCompetition: (Name, EventDate, DUration) => CompetitionClient.post({ Name, EventDate, DUration }).then(data => dispatch(act(ADD_COMPETITIOIN, data))),
		updateCompetition: (id, Name, EventDate, DUration) => CompetitionClient.put({ Name, EventDate, DUration }, id).then(data => dispatch(act(UPDATE_COMPETITIOIN, data))),
	};
};

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(mainPage);