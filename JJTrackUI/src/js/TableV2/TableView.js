import React from 'react';
import HeaderRow from './HeaderRow';
import DataRow from './DataRow';
import FooterRow from './FooterRow';

class TableView extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { headers, dataRows, footers, className } = this.props;

		return (
			<table className={"utable " + className}>
				<thead className="utable--header-container">
				{
					headers.map( (header, index ) => (
						<HeaderRow
							key = { index }
							row = { header }
						/>
					))
				}
				</thead>
				<tfoot className="utable--footer-container">
				{
					footers.map((footer, index) => (
						<FooterRow
							key={ index }
							row={ footer }
						/>
					))
				}
				</tfoot>
				{/* Transition group component renders as its component prop, in this case: tbody. It passes the className, too.*/}
				{/*<ReactCSSTransitionGroup*/}
					{/*transitionName = "transition-data-container"*/}
					{/*transitionAppear = { false }*/}
					{/*transitionAppearTimeout = { 500 }*/}
					{/*transitionLeaveTimeout = { 500 }*/}
					{/*transitionEnterTimeout = { 500 }*/}
				    {/*component = 'tbody'*/}
					{/*className = "utable--data-container"*/}
				{/*>*/}
				<tbody>
				{
					dataRows.map( row => (
						<DataRow
							key = { row.rowKey }
							row = { row }
						/>
					))
				}
				</tbody>
				{/*</ReactCSSTransitionGroup>*/}
			</table>
		);
	}
}

export default TableView;
