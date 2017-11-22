import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Button from '../Button'
import './AppFooter.css'

class AppFooter extends Component {
	handleOnClick = () => {
		const { updateLocalSteps, status } = this.props

		updateLocalSteps(status)
	}

	render() {
		const { data = {}, nextButton, showStatusText, statusTextType, type } = this.props
		const { memeSource = '', textError, textSuccess, buttonText } = data

		return (
			<div className="footer">
				<div className="footer__link--wrapper">
					{!_.isEmpty(data) && type !== 'done' && (
						<a
							className="footer__link"
							href={memeSource}
							rel="noopener noreferrer"
							target="_blank"
							title="Прошу прощения, а это из какого мема?"
						>
							<div className="footer__hint">
								<div className="footer__icon-field">
									<i className="footer__icon" />
								</div>
								<div className="footer__hint-message">Подсказка</div>
							</div>
						</a>
					)}
				</div>

				{showStatusText && (
					<p className="footer__text">
						{statusTextType === 'fail' ? textError : textSuccess }
					</p>
				)}

				{nextButton && Button({ onClick: this.handleOnClick, text: buttonText })}
			</div>
		)
	}
}

AppFooter.propTypes = {
	data: PropTypes.object,
	nextButton: PropTypes.bool,
	status: PropTypes.bool,
	updateLocalSteps: PropTypes.func,
	showStatusText: PropTypes.bool,
	statusTextType: PropTypes.string,
	type: PropTypes.string,
}

export default AppFooter
