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
						{window.stockData.slice(1, this.state.visibleRows).map((item, id) => (
							<tr key={id} className={window.stockData[window.stockData.length - 1].includes(id+1) ? 'corrected' : null}>
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
