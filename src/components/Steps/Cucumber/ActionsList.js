import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DropItem from '../../DragNDrop/DropItem'

class ActionsList extends Component {
	renderItem() {
		const { addActionToActionsField, selectedActions, unselectedActions } = this.props

		return (
			unselectedActions.map(action => {
				return (
					<DropItem
						className="cucumber__item"
						key={action.id}
						name={action.name}
						selectedItems={selectedActions}
						addItemToList={addActionToActionsField}
					/>
				)
			})
		)
	}

	render() {
		return (
			<ul className="cucumber__list">
				{this.renderItem()}
			</ul>
		)
	}
}

ActionsList.propTypes = {
	addActionToActionsField: PropTypes.func.isRequired,
	selectedActions: PropTypes.array,
	unselectedActions: PropTypes.array,
}

export default ActionsList
