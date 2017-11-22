import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

const handleOnClick = (e, props) => {
	e.preventDefault()
	props.onClick()
}

const Button = (props) => (
	<button
		className="button"
		onClick={
			(e) => handleOnClick(e, props)
		}
	>
		{props.text ? props.text : 'Продолжить'}
	</button>
)

Button.propTypes = {
	text: PropTypes.string,
}

export default Button
