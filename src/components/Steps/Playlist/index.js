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
		step: window.stockData > 1000 ? 100 : 10,
		page: 0,
	}

	isAnswerCorrect = (choiceId) => {
		const { correctAnswerId } = this.props.data

		return correctAnswerId === choiceId
	}

	chooseAnswer = (choiceId) => {
		const urls = ['', 'anomaly', 'duplicate', 'empty']
		const prefix = urls[choiceId]

		fetch(`${window.url}/${prefix}/`)
			.then(res => res.json()).then((data) => {
				// console.log(data, 'data')
				// window.stockData = data;
				// this.forceUpdate();
				alert('Корректировка прошла успешно')
				 // window.prevStockData = window.mockData;
		 }).catch(function(error) {
			 	let newData = [];

				if (prefix === 'empty') {
					newData = [["Date","USD","Frank","EUR","Dirham"],["01.01.2017","61","80","95","134"],["01.02.2017","62","85","94","136"],["01.03.2017","61","81","93","10"],["01.04.2017","900","83","90","132"],["01.05.2017","60","83","89","130"],["01.06.2017","59","81","99","134"],["01.07.2017","72","84","92","135"],["01.08.2017","60","86","91","110"],["01.09.2017","431","10","90","136"],["01.10.2017","62","82","92","137"],["01.11.2017","63","80","94","131"],["01.12.2017","68","81","90","130"],["01.01.2018","70","80","96","129"], [9,6,3,8]];
				}

				if (prefix === 'anomaly') {
					newData = [["Date","USD","Frank","EUR","Dirham"],["01.01.2017","61","80","95","134"],["01.02.2017","62","85","94","136"],["01.03.2017","61","81","93","10"],["01.04.2017","60","83","90","132"],["01.05.2017","60","83","89","130"],["01.06.2017","59","81","99","134"],["01.07.2017","72","84","92","135"],["01.08.2017","60","86","91","110"],["01.09.2017","431","10","90","136"],["01.10.2017","62","82","92","137"],["01.11.2017","63","80","94","131"],["01.12.2017","68","81","90","130"],["01.01.2018","70","80","96","129"], [4]]
				}

				if (prefix === 'duplicate') {
					newData = [["Date","USD","Frank","EUR","Dirham"],["01.01.2017","61","80","95","134"],["01.02.2017","62","85","94","136"],["01.03.2017","61","81","93","10"],["01.04.2017","900","86","90","132"],["01.05.2017","60","83","89","130"],["01.06.2017","59","81","99","134"],["01.07.2017","72","84","92","135"],["01.08.2017","60","86","91","110"],["01.09.2017","431","10","90","136"],["01.10.2017","62","82","92","137"],["01.11.2017","63","80","94","131"],["01.12.2017","68","81","90","130"],["01.01.2018","70","80","96","129"], []]
				}

				window.stockData = newData
				// window.prevStockData = [...newData];

				alert('Корректировка прошла!', error)
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

	optionChange = (e) => {
		this.setState({
			page: e.target.value,
		})
	}

	renderSelect = () => {
		const { step } = this.state
		const numberOfPages = (window.stockData.length / step).toFixed(0)
		const data = Array.apply(null, Array(+numberOfPages)).map((val, idx) => idx);

		console.log(numberOfPages, 'numberOfPages', data)

		return (
			<select onChange={this.optionChange} className="custom-select">
				<option disabled>Выберите диапозон</option>

				{data.map((val, id) => (
					<option value={id}>{id * step} - {(step * (id + 1))}</option>
				))}
			</select>
		)
	}

	render() {
		const { answerIsChoosen, page, step } = this.state
		const { data } = this.props
		const stockData = window.stockData.slice(1)
		const currentStepStockData = stockData.slice(+page * step, (+page + 1) * step)
		console.log(+page, 'page', currentStepStockData, (+page + 1) * step)

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
							{currentStepStockData.map((item, id) => (
								<tr key={id}>
									<th scope="row">{page === 0 ? id + 1 : +page * step + id + 1}</th>
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

					{this.state.step < window.stockData.length &&
						this.renderSelect()
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
