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
		const urls = ['', 'anomaly', 'duplicate', 'empty']
		const prefix = urls[choiceId]

		fetch(`${window.url}/${prefix}/`, {
			method: 'POST',
			body: null,
		})
			.then(res => res.json()).then((data) => {
				window.stockData = data;
				 // window.prevStockData = window.mockData;
		 }).catch(function(error){
				alert('Файл не загружен!', error)
		});

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
			<ul className="test__list" style={{'marginTop': '40px'}}>
				<h3>Выберите метод корректировки:</h3>
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

	state = {
		visibleRows: 10,
	}

	showMore = (e) => {
		e.preventDefault();
		this.setState({ visibleRows: this.state.visibleRows + 10 })
	}

	render() {
		const { answerIsChoosen } = this.state
		const { data } = this.props

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
								{window.stockData[0].map((item) => (
									<th scope="col">{item}</th>
								))}

							</tr>
						</thead>
						<tbody>
							{window.stockData.slice(1, this.state.visibleRows).map((item, id) => (
								<tr key={id}>
									<th scope="row">{id + 1}</th>
									{item.length < 4 ?
										['', '', '', '', ''].map((text) => (
											<td>—</td>
										))
										:
										item.map((text) => (
											<td>{text}</td>
										))
									}
								</tr>
							))}
						</tbody>
					</table>

					{this.state.visibleRows < window.stockData.length &&
						<button onClick={this.showMore}>Показать следующие 10</button>
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
