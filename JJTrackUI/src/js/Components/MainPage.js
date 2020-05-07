import React from 'react';
import UrbanTable from '../TableV2/UrbanTable';

import { connect } from 'react-redux';
import {
	LOAD_MEMBERS, act
} from '../Actions/ActionNames';
import {history} from '../Routing/History';
import {Routes} from '../Routing/Routes';
import Icon, { Icons } from './Icon';
import {PickPopup, Transfer} from './PickPopup';
import {NewMemberPopupContent} from './NewMemberPopupContent';
import {MemberClient} from '../Rest/MemberClient';

class mainPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount () {
		this.props.load();
	}

	render() {
		const {  } = this.state;
		const { addMember, members } = this.props;

		console.log(members);

		return (
			<div className="main-page">
				<PickPopup
					trigger={
						<Icon icon={Icons.june} className="add-member" />
					}
					popupContent={
						Transfer({ add: addMember }, NewMemberPopupContent)
					}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		members: state.members,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		load: () => Promise.all([
			MemberClient.get('').then(data => dispatch(act(LOAD_MEMBERS, data))),
		]),
		addMember: name => MemberClient.post({ name }),
	};
};

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(mainPage);