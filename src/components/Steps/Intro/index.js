import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tooltip from '../../Tooltip'
import Button from '../../Button'

import './Intro.css'

class Intro extends Component {
	render() {
		return (
			<div className="intro">
				<div className="intro__welcome">
					<h1 className="intro__header">StatAnalys</h1>
					<div className="intro__description">
						<br />
						<span>
							Спрогнозируем изменения котировок и очистим некорректные данные!
						</span>
					</div>

					<Button
						onClick={() => {
							this.props.updateLocalStorage(true)
							this.props.updateLocalSteps(true)
						}}
						text="Начать!"
					/>
				</div>

				<div className="intro__prizes" />
			</div>
		)
	}
}

Intro.propTypes = {
	updateLocalStorage: PropTypes.func,
	updateLocalSteps: PropTypes.func,
}

export default Intro
