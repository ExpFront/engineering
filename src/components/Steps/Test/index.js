import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Button from '../../Button'
import image from '../../../assets/images/100500.png'

import './Test.css'

class Test extends Component {
	state = {
		answerIsChoosen: false,
		choosenAnswerId: null,
	}

	isAnswerCorrect = (choiceId) => {
		const { correctAnswerId } = this.props.data

		return correctAnswerId === choiceId
	}

	chooseAnswer = (choiceId) => {
		const { updateLocalStorage } = this.props

		const debouncedSetState = _.debounce(
			() => this.setState({
				answerIsChoosen: true,
				choosenAnswerId: choiceId,
			}),
			100
		)

		debouncedSetState()
		updateLocalStorage(this.isAnswerCorrect(choiceId))
	}

	handleOnClick = () => {
		const { choosenAnswerId } = this.state
		const { updateLocalSteps } = this.props

		updateLocalSteps(this.isAnswerCorrect(choosenAnswerId))
	}

	getChoiceCorrectness = (choiceId) => {
		const { answerIsChoosen } = this.state

		if (answerIsChoosen) {
			if (this.isAnswerCorrect(choiceId)) {
				return 'correct'
			} else {
				return choiceId !== this.state.choosenAnswerId ? 'unselected' : 'incorrect'
			}
		}
	}

	renderDescription(id) {
		const { data } = this.props
		const someData = data.choices.filter(choice => choice.id === id)

		return (
			<span className="test__description">
				{_.head(someData).description}
			</span>
		)
	}

	renderFormBody = () => {
		const { answerIsChoosen, choosenAnswerId } = this.state
		const { data } = this.props

		return (
			<ul className="test__list">
				{data.choices.map((choice) => (
					<li className="test__choice" key={choice.id}>
						<label className="test__label">

							{!answerIsChoosen &&
								<input
									type="radio"
									className="test__radio"
									name="answer"
									onChange={() => this.chooseAnswer(choice.id)}
								/>
							}

							{this.getChoiceCorrectness(choice.id) !== 'unselected' &&
								<div
									className={`test__check test__check_type_${this.getChoiceCorrectness(choice.id)}`}
								/>
							}

							<span
								className={`test__option test__option_type_${this.getChoiceCorrectness(choice.id)}`}
							>
								{choice.text}

								{choice.id === choosenAnswerId && this.renderDescription(choosenAnswerId)}
							</span>
						</label>
					</li>
				))}
			</ul>
		)
	}

	componentWillReceiveProps(nextProps) {
		if (this.props !== nextProps) {
			this.setState({
				answerIsChoosen: false,
				choosenAnswerId: null,
			})
		}
	}

	render() {
		const { answerIsChoosen } = this.state
		const { data } = this.props

		return (
			<div className="test">
				<div className="test__logo">
					<img className={`image image image_for_${data.image}`} src={image} alt="Логотип теста" />
				</div>
				<h3 className="test__question">
					{data.question}
				</h3>

				<form className="test__form">
					{this.renderFormBody()}

					{answerIsChoosen &&
						<div className="test__submit">
							<Button onClick={this.handleOnClick} text={data.buttonText} />
						</div>
					}
				</form>
			</div>
		)
	}
}

Test.propTypes = {
	data: PropTypes.object,
	updateLocalStorage: PropTypes.func,
	updateLocalSteps: PropTypes.func,
}

export default Test
