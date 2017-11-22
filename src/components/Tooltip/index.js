import React from 'react'
import PropTypes from 'prop-types'

import './Tooltip.css'

type Props = {
	heading: PropTypes.string.required,
	children: PropTypes.node.required,
}

const Tooltip = ({heading, children} : Props) => (
	<div className="tooltip">
		<h2 className="tooltip__heading">
			{heading}
		</h2>
		<p className="tooltip__content">
			{children}
		</p>
	</div>
)

export default Tooltip
