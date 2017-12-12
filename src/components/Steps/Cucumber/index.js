import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts);

import Button from '../../Button'
import image from '../../../assets/images/100500.png'

import './Cucumber.css'

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

	handleCancel = () => {
		const { choosenAnswerId } = this.state
		const { updateLocalSteps } = this.props
		updateLocalSteps(this.isAnswerCorrect(choosenAnswerId), true)

		window.stockData = [...window.prevStockData];
	}

	handleOnClick = () => {
		const { choosenAnswerId } = this.state
		const { updateLocalSteps } = this.props

		updateLocalSteps(this.isAnswerCorrect(choosenAnswerId), true)
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


	componentDidMount() {
		window.maxValues = {};

		const getData = (id) => {
			const arr = []
			const data = window.stockData.slice(1).map((item) => {
				console.log(item, 'item')
				if (item.length > 1) {
					arr.push(+item[id+1])
				}
			})

			const maxValue = Math.max.apply(null, arr)
			window.maxValues[window.stockData[0][id+1]] = maxValue

			return arr
		}

		const getSeries = () => {
			const series = window.stockData[0].slice(1).map((item, id) => ({
					name: item,
					data: getData(id)
			}))

			return series

		}

		Highcharts.chart('highcharts', {
		    chart: {
		        type: 'line'
		    },
		    title: {
		        text: 'Прогноз котировок акций на год'
		    },
		    xAxis: {
		        categories: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июнль', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек']
		    },
		    yAxis: {
		        title: {
		            text: 'Изменение курса валюты'
		        }
		    },
				exporting: {
            enabled: true
        },
		    plotOptions: {
		        line: {
		            dataLabels: {
		                enabled: true
		            },
		            enableMouseTracking: true
		        }
		    },
		    series: getSeries(),
		});

		this.forceUpdate();
	}

	showAcceptButtons = (e, row, column) => {
		window.stockData[row][column] = e.target.value
		this.forceUpdate()
	}

	removeChange = (e, row, column) => {
		e.preventDefault();

		window.stockData[row][column] = window.prevStockData[row][column]
		this.forceUpdate()
	}

	render() {
		const { answerIsChoosen, page, step } = this.state
		const { data } = this.props
		const stockData = window.stockData.slice(1)
		const currentStepStockData = stockData.slice(+page * step, (+page + 1) * step)

		return (
			<div className="test">
				<h3 className="test__question">
					Ваши данные после корректировки:
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
							<tr key={id} className={window.stockData[window.stockData.length - 1].includes(id+1) ? 'corrected' : null}>
								<th scope="row">{page === 0 ? id + 1 : +page * step + id + 1}</th>
								{item.length < 4 ?
									['', '', '', '', ''].map((text) => (
										<td>—</td>
									))
									:
									item.map((text, id2) => {
										return (
											<td>
												{
													window.prevStockData[page === 0 ? id + 1 : +page * step + id + 1][id2] !== window.stockData[page === 0 ? id + 1 : +page * step + id + 1][id2] &&
														<span className="prevValue">{window.prevStockData[id+1][id2]}</span>
												}
												{(window.prevStockData[page === 0 ? id + 1 : +page * step + id + 1][id2] !== window.stockData[page === 0 ? id + 1 : +page * step + id + 1][id2]) && window.prevStockData[page === 0 ? id + 1 : +page * step + id + 1][id2]?
													<div>
														<input className="input" onChange={(e) => this.showAcceptButtons(e, id+1, id2)} type="text" value={text}/>
														<button type="button" onClick={(e) => this.removeChange(e, id+1, id2)}>X</button>
													</div>
													:
													text
												}
											</td>
										)}
									)
								}
							</tr>
						))}
					</tbody>
				</table>

				{this.state.step < window.stockData.length &&
					this.renderSelect()
				}

					<div id="highcharts"></div>

					<div className="maxValues">
						{window.maxValues && Object.keys(window.maxValues).map((item) => (
							<p>Максимальная стоимость валюты {item} — {window.maxValues[item]} рублей</p>
						))}
					</div>

					<div className="test__submit">
						<div style={{'margin-right': '20px', 'display': 'inline-block'}}>
							<Button onClick={this.handleCancel} text="Отменить"/>
						</div>

						<Button onClick={this.handleOnClick} text={data.buttonText} />
					</div>
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
