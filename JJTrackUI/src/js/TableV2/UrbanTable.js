import React from 'react';
import TableView from './TableView';
import ModApplier from './Modding/ModApplier';
import PropTypes from 'prop-types';

class UrbanTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dataRows: [],
			headers: [],
			footers: [],
		};

		this.modApplier = new ModApplier();

		this.applyModsOnHeader = this.applyModsOnHeader.bind(this);
		this.applyModsOnData = this.applyModsOnData.bind(this);
		this.applyModsOnFooter = this.applyModsOnFooter.bind(this);
	}

	componentDidMount() {
		this.applyModsOnData(this.props.data, this.props.mods, this.props.columnKeys);
		this.applyModsOnHeader(this.props.headers, this.props.mods, this.props.columnKeys);
		this.applyModsOnFooter(this.props.footers, this.props.mods, this.props.columnKeys);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data || nextProps.mods !== this.props.mods) {
			this.applyModsOnData(nextProps.data, nextProps.mods, nextProps.columnKeys);
		}
		if (nextProps.headers !== this.props.headers || nextProps.mods !== this.props.mods) {
			this.applyModsOnHeader(nextProps.headers, nextProps.mods, nextProps.columnKeys);
		}
		if (nextProps.footers !== this.props.footers || nextProps.mods !== this.props.mods) {
			this.applyModsOnFooter(nextProps.footers, nextProps.mods, nextProps.columnKeys);
		}
	}

	applyModsOnData(data, mods, columnKeys) {
		this.setState({
			dataRows: this.modApplier.generateDataRows(data, mods, columnKeys)
		});
	}
	applyModsOnHeader(data, mods, columnKeys) {
		this.setState({
			headers: this.modApplier.generateHeaderRows(data, mods, columnKeys)
		});
	}
	applyModsOnFooter(data, mods, columnKeys) {
		this.setState({
			footers: this.modApplier.generateFooterRows(data, mods, columnKeys)
		});
	}

	render() {

		let { className } = this.props;
		let { dataRows, headers, footers } = this.state;

		return (
			<TableView
				className = { className }
				headers = { headers }
			    dataRows = { dataRows }
			    footers = { footers }
			/>
		);
	}
}

UrbanTable.propTypes = {
	mods: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	headers: PropTypes.array.isRequired,
	footers: PropTypes.array.isRequired,
	columnKeys: PropTypes.array.isRequired,
};

export default UrbanTable;
