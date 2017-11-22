import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import DropBox from '../../DragNDrop'

class ActionsField extends Component {
	state = {
		isEqual: false,
	}

	renderSelectedActions() {
		const { selectedActions, allActions } = this.props
		const isLastAction = id => _.size(allActions) - 1 === id

		const wholeString = selectedActions.reduce((acc, current, id) => {
			let str = acc + current

			if (!isLastAction(id)) {
				str += ', '
			}

			return str
		}, '')

		return wholeString.padEnd(200)
	}

	render() {
		return (
			<DropBox>
				<div className="field">
					<span className="field__list">
						{this.renderSelectedActions()}
					</span>
				</div>
			</DropBox>
		)
	}
}

ActionsField.propTypes = {
	selectedActions: PropTypes.array.isRequired,
	allActions: PropTypes.array.isRequired,
}

export default ActionsField
