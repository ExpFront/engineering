import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Mobile.css'

class Mobile extends Component {
	render() {
		return (
			<div className="mobile">
				<h1 className="mobile__heading">Здарова!</h1>
				<p className="mobile__content">
					Друзья, мы очень хотели сделать для вас что-то очень приятное, но оно работает только на десктопе. Заходите на этот сайт с ваших компуктеров!
				</p>

				<div className="mobile__iphone" />
			</div>
		)
	}
}

Mobile.propTypes = {
	goToNextStep: PropTypes.func,
}

export default Mobile
