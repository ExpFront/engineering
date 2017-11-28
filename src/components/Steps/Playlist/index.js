import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Button from '../../Button'
import image from '../../../assets/images/100500.png'

import './Playlist.css'

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
			return choiceId !== this.state.choosenAnswerId ? 'unselected' : 'correct'
			// if (this.isAnswerCorrect(choiceId)) {
			// 	return 'correct'
			// } else {
			// 	return choiceId !== this.state.choosenAnswerId ? 'unselected' : 'incorrect'
			// }
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

	componentWillReceiveProps(nextProps) {
		if (this.props !== nextProps) {
			this.setState({
				answerIsChoosen: false,
				choosenAnswerId: null,
			})
		}
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
							</span>
						</label>
					</li>
				))}
			</ul>
		)
	}

	render() {
		const { answerIsChoosen } = this.state
		const { data } = this.props
		console.log(data, 'data')
		return (
			<div className="test">
				<h3 className="test__question">
					Ваши данные:
				</h3>

				<form className="test__form">
					<table className="table">
						<thead className="thead-dark">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Купюра</th>
								<th scope="col">AVG цена/неделя</th>
								<th scope="col">AVG цена/месяц</th>
								<th scope="col">AVG цена/квартал</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">1</th>
								<td>Рубль</td>
								<td>43.22</td>
								<td>41.94</td>
								<td>30.25</td>
							</tr>
							<tr>
								<th scope="row">2</th>
								<td>Доллар</td>
								<td>60.21</td>
								<td>63.09</td>
								<td>70.32</td>
							</tr>
							<tr>
								<th scope="row">3</th>
								<td>Евро</td>
								<td>71.29</td>
								<td>43.94</td>
								<td>74.55</td>
							</tr>
							<tr>
								<th scope="row">4</th>
								<td>Франк</td>
								<td>52.46</td>
								<td>60.26</td>
								<td>58.84</td>
							</tr>
						</tbody>
					</table>

					{data.image !== 'kandibober' && this.renderFormBody()}

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
