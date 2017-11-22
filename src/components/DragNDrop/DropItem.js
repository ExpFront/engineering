import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'

import Types from './types'

const boxSource = {
	beginDrag(props) {
		return {
			name: props.name,
		}
	},

	endDrag(props, monitor) {
		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()
		const itemExist = props.selectedItems.filter(selectedItem => selectedItem === item.name)

		if (dropResult && itemExist.length === 0) {
			props.addItemToList(item.name)
		}
	},
}

class DropItem extends Component {
	render() {
		const { isDragging, connectDragSource, name, className } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(
			<li
				className={className}
				style={{ opacity }}
				key={name}
			>
				{name}
			</li>
		)
	}
}

DropItem.propTypes = {
	connectDragSource: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
}

export default DragSource(Types.LIST, boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(DropItem)
