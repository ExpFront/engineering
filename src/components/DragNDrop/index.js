import { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'

import Types from './types'

const boxTarget = {
	drop() {
		return { name: 'DropBox' }
	},
}

class DropBox extends Component {
	render() {
		const { connectDropTarget, children } = this.props

		return connectDropTarget(children)
	}
}

DropBox.propTypes = {
	connectDropTarget: PropTypes.func.isRequired,
	children: PropTypes.any.isRequired,
}

export default DropTarget(Types.LIST, boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))(DropBox)
