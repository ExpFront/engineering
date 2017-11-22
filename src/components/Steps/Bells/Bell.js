import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import image from '../../../assets/images/100500.png'

class Bell extends Component {
	renderDescription(id) {
		const { data } = this.props
		const someData = data.choices.filter(choice => choice.id === id)

		return (
			<span className="test__description">
				{_.head(someData).description}
			</span>
		)
	}

	render() {
		const { choice, handleOnClick, answerIsChoosen, choosenAnswerId, correctnessClassName } = this.props

		return (
			<button
				className="bells__column"
				onClick={handleOnClick}
			>
				<div className="bells__image-container">
					<img
						className={`image image ${choice.imageClassName}`}
						src={image}
						alt="Барабанцев"
					/>
				</div>

				<label className="bells__label">
					{!answerIsChoosen &&
						<input
							className="bells__radio"
							type="radio"
							name="bells"
							value={choice.value}
						/>
					}

					{correctnessClassName !== 'unselected' && (
						<div className={`bells__check bells__check_type_${correctnessClassName}`} />
					)}

					<span className={`bells__option bells__option_type_${correctnessClassName}`}>
						{choice.text}

						{choice.id === choosenAnswerId && this.renderDescription(choosenAnswerId)}
					</span>
				</label>
			</button>
		)
	}
}

Bell.propTypes = {
	data: PropTypes.object,
	choice: PropTypes.object,
	choosenAnswerId: PropTypes.number,
	answerIsChoosen: PropTypes.bool.isRequired,
	correctnessClassName: PropTypes.string,
	handleOnClick: PropTypes.func.isRequired,
}

export default Bell
