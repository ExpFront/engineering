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

		if (window.duplicated) {
			fetch(`${window.url}/save/`, {
				method: 'POST',
				body: window.stockData,
			})
		}

		window.prevStockData = [...window.stockData]
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

		return (
			<select onChange={this.optionChange} className="custom-select">
				<option disabled>Выберите диапозон</option>

				{data.map((val, id) => (
					<option value={id}>{id * step} - {(step * (id + 1))}</option>
				))}
			</select>
		)
	}

	renderHighcharts() {
		window.maxValues = {};

		const getData = (id) => {
			const arr = []
			const data = window.stockData.slice(1, window.stockData.length > 15 ? 15 : window.stockData.length).map((item) => {
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


		window.chart = Highcharts.chart('highcharts', {
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

	componentDidMount() {
		this.renderHighcharts();
	}

	showAcceptButtons(e, row, column) {
		window.stockData[row][column] = e.target.value;
		this.forceUpdate();
		window.chart.destroy();
		this.renderHighcharts();
		// .setData(window.stockData,true);
	}

	removeChange(e, row, column) {
		e.preventDefault();

		window.stockData[row][column] = window.prevStockData[row][column];
		this.forceUpdate();
		window.chart.destroy();
		this.renderHighcharts();

	}

	goTo(e, item) {
		e.preventDefault();

		this.setState({
			page: Math.floor(+(item / this.state.step)),
		})
	}

	cancelRemoving(id) {
		console.log(id);
		window.stockData[window.stockData.length - 1].map((arr, index) => {
			arr.map((item, arrId) => {
				if (item === id) {
					if (item.length < 2) {
						window.stockData[window.stockData.length - 1].splice(arrId, 1);
					}

					window.stockData[window.stockData.length - 1][index].splice(arrId, 1);
				}
			})
		})

		this.forceUpdate();
	}

	renderDuplicatedGroups() {
		return window.stockData[window.stockData.length - 1].map((body) => (
			<div style={{'display': 'inline-block', 'margin-right' : '30px'}} >{body.map((item, id) => ([
				<a style={{'display': 'inline-block', 'margin-right' : '5px'}} href="#" onClick={(e) => this.goTo(e, item)}>{item}</a>,
				<span style={{'display': 'inline-block', 'margin-right' : '10px'}} onClick={() => this.cancelRemoving(item)}>√</span>
			]))}</div>
		))
	}

	render() {
		const { answerIsChoosen, page, step } = this.state
		const { data } = this.props
		const stockData = window.stockData.slice(1)
		const currentStepStockData = stockData.slice(+page * step, (+page + 1) * step)


		window.getClassname = (id) => {
			return window.stockData[window.stockData.length - 1].join().split(',').map(item => +item).includes(page === 0 ? id + 1 : +page * step + id + 1) ? 'corrected' : null;
		}


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
						{currentStepStockData.map((item, id) => {return(
							<tr key={id} className={window.getClassname(id)}>
								<th scope="row">{page === 0 ? id + 1 : +page * step + id + 1}</th>
								{+page * step + id + 1 === stockData.length || item.length < 4 ?
									['', '', '', '', ''].map((text) => (
										<td>—</td>
									))
									:
									item.map((text, id2) => {
										window.s = window.stockData[page === 0 ? id + 1 : +page * step + id + 1][id2]
										const flag = window.prevStockData[page === 0 ? id + 1 : +page * step + id + 1][id2] !== window.s

										return (
											<td>
												{ flag &&
														<span className="prevValue">{window.prevStockData[id+1][id2] ? window.prevStockData[id+1][id2] : '—'}</span>
												}
												{flag ?
													<div>
														<input className="input" onChange={(e) => this.showAcceptButtons(e, page === 0 ? id + 1 : +page * step + id + 1, id2)} type="text" value={text}/>
														<button type="button" onClick={(e) => this.removeChange(e, page === 0 ? id + 1 : +page * step + id + 1, id2)}>X</button>
													</div>
													:
													text
												}
											</td>
										)}
									)
								}
							</tr>
						)})}
					</tbody>
				</table>

				<div className="go">
					Перейти к следующему изменению по номеру:
					<br/>

					{
						window.duplicated ? this.renderDuplicatedGroups()
						:
						window.stockData[window.stockData.length - 1].map((item) => (
							<a style={{'display': 'inline-block', 'margin-right' : '10px'}}href="#" onClick={(e) => this.goTo(e, item)}>{item}</a>
						))
					}
				</div>

				{this.state.step < window.stockData.length &&
					this.renderSelect()
				}

				<a style={{'marginLeft': '50px', 'display': 'none'}} href={`${window.url}/download`}>Скачать .csv</a>

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
