import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Heading from '../../Heading'
import Bell from './Bell'

import './Bells.css'

class Bells extends Component {
	state = {
		answerIsChoosen: false,
		choosenAnswerId: null,
	}

	isAnswerCorrect = (choiceId) => {
		const { correctAnswerId } = this.props.data

		return correctAnswerId === choiceId
	}

	chooseAnswer = (choiceId) => {
		const { showNextButton, updateLocalStorage } = this.props
		const debouncedSetState = _.debounce(
			() => this.setState({
				answerIsChoosen: true,
				choosenAnswerId: choiceId,
			}),
			100
		)

		debouncedSetState()
		showNextButton(this.isAnswerCorrect(choiceId))
		updateLocalStorage(this.isAnswerCorrect(choiceId))
	}

	handleOnClick(value, id) {
		if (this.state.choosenAnswerId) {
			return
		}
		this.chooseAnswer(id)
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

	render() {
		const { data } = this.props
		const { choices, question } = data
		const { answerIsChoosen, choosenAnswerId } = this.state

		return (
			<div className="bells">
				<Heading text={question} />

				<div className="bells__container">
					{choices.map(choice => (
						<Bell
							key={choice.id}
							data={data}
							choice={choice}
							handleOnClick={() => this.handleOnClick(choice.value, choice.id)}
							answerIsChoosen={answerIsChoosen}
							choosenAnswerId={choosenAnswerId}
							correctnessClassName={this.getChoiceCorrectness(choice.id)}
						/>
					))}
				</div>
			</div>
		)
	}
}

Bells.propTypes = {
	data: PropTypes.object.isRequired,
	showNextButton: PropTypes.func,
	updateLocalStorage: PropTypes.func,
}

export default Bells
