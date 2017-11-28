import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Highcharts from 'highcharts';
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

	componentDidMount() {
		Highcharts.chart('highcharts', {
		    chart: {
		        type: 'line'
		    },
		    title: {
		        text: 'Monthly Average Temperature'
		    },
		    subtitle: {
		        text: 'Source: WorldClimate.com'
		    },
		    xAxis: {
		        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		    },
		    yAxis: {
		        title: {
		            text: 'Temperature (°C)'
		        }
		    },
		    plotOptions: {
		        line: {
		            dataLabels: {
		                enabled: true
		            },
		            enableMouseTracking: false
		        }
		    },
		    series: [{
		        name: 'Tokyo',
		        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
		    }, {
		        name: 'London',
		        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
		    }]
		});
	}

	render() {
		const { answerIsChoosen } = this.state
		const { data } = this.props
		console.log(data, 'data')
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

					<div id="highcharts"></div>

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
