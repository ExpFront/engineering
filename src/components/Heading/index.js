import React from 'react'
import PropTypes from 'prop-types'

import './Heading.css'

const Heading = ({ text }) => (
	<h1 className="heading">
		{text}
	</h1>
)

Heading.propTypes = {
	text: PropTypes.string.isRequired,
}

export default Heading
