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

		const input = document.getElementsByClassName('file')[0]
		const reader = new FileReader();

		const file = input.files[0];
		sendFile(file)

		function sendFile(file) {
			var reader = new FileReader();

			 reader.readAsDataURL(file);
			 reader.onload = function () {
				 const base64 = reader.result
				 window.url = 'http://0a253400.ngrok.io/api'

				 fetch(`${window.url}/upload/`, {
							method: 'POST',
							body: base64,
					}).then((res)  => res.json()).then((data) => {
							window.mockData = [["Date","USD","Frank","EUR","Dirham"],[""],["01.01.2017","61","80","95","134"],[""],["01.02.2017","62","85","94","136"],[""],["01.03.2017","61","81","93",""],[""],["01.04.2017","900","86","90","132"],[""],["01.05.2017","60","83","89","130"],[""],["01.06.2017","59","","99","134"],[""],["01.07.2017","72","84","92","135"],[""],["01.08.2017","60","86","91",""],[""],["01.09.2017","","10","90","136"],[""],["01.10.2017","62","82","92","137"],[""],["01.11.2017","63","80","94","131"],[""],["01.12.2017","68","81","90","130"],[""],["01.01.2018","70","80","96","129"],[""],[""], [3, 5, 10, 13, 16]];

							alert('Файл загружен!')

							window.stockData = data;
							window.prevStockData = [...data];
					}).catch(function(error){
							alert('Файл не загружен!', error)
					});
			 };

			 reader.onerror = function (error) {
				 console.error('Error: ', error);
			 };
		}

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

					{data.image === 'kandibober' &&
						<div className="input-group">
							<input type="file" onChange={() => this.chooseAnswer(0)} className="form-control file" id="basic-url" aria-describedby="basic-addon3"/>
						</div>
					}

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
