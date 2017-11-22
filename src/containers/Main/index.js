import React, { Component } from 'react'
import _ from 'lodash'

import Progress from '../../components/Progress'
import AppFooter from '../../components/AppFooter'
import Mobile from '../../components/Mobile'

import allSteps from '../../constants/all-steps.js'

import './Main.css'

function getPassedSteps() {
	if (!localStorage.getItem('steps')) {
		const defaultState = [{
			type: 'intro',
			status: null,
		}]

		localStorage.setItem('steps', JSON.stringify(defaultState))

		return defaultState
	}

	return JSON.parse(localStorage.getItem('steps'))
}

function isMobile() {
	const { userAgent } = navigator
	const regex = /Android|webOS|iPhone|iP[ao]d|BlackBerry|Win(dows )?Phone/i

	return regex.test(userAgent)
}

class Main extends Component {
	state = {
		steps: [],
		nextButton: false,
		status: false,
		showStatusText: false,
		statusTextType: null,
	}

	componentDidMount() {
		this.setState({ steps: getPassedSteps() })
	}

	updateStepsArray(isStepStatusSuccess) {
		const { steps } = this.state
		const currentStepId = _.findIndex(allSteps, {type: _.last(steps).type})
		const nextStepType = allSteps[currentStepId + 1].type

		const newSteps = [
			...steps,
			{
				type: nextStepType,
				status: isStepStatusSuccess ? 'success' : 'fail',
			},
		]

		return newSteps
	}

	updateLocalSteps = (isStepStatusSuccess) => {
		const newSteps = this.updateStepsArray(isStepStatusSuccess)

		this.setState({
			steps: newSteps,
			nextButton: false,
			status: false,
			showStatusText: false,
			statusTextType: null,
		})
	}

	updateLocalStorage = (isStepStatusSuccess) => {
		const newSteps = this.updateStepsArray(isStepStatusSuccess)

		localStorage.setItem('steps', JSON.stringify(newSteps))
	}

	showNextButton = (value, type) => {
		this.setState({
			nextButton: true,
			status: value,
			showStatusText: !!type,
			statusTextType: type,
		})
	}

	getStepType = () => _.last(this.state.steps).type

	render() {
		const { steps, nextButton, status, statusTextType, showStatusText } = this.state

		if (steps.length === 0) {
			return null
		}

		const stepsWithoutIntro = _.tail(steps)
		const Step = _.find(allSteps, {type: _.last(steps).type})
		const stepType = this.getStepType()

		if (isMobile()) {
			return <Mobile />
		}

		if (stepType === 'intro') {
			return (
				<div className="main__intro">
					<Step.component
						updateLocalStorage={this.updateLocalStorage}
						updateLocalSteps={this.updateLocalSteps}
					/>
				</div>
			)
		}

		if (stepType === 'done' || stepType === 'auth') {
			return (
				<div className={`main__${stepType}`}>
					<Step.component
						steps={steps}
						updateLocalStorage={this.updateLocalStorage}
						updateLocalSteps={this.updateLocalSteps}
						showNextButton={this.showNextButton}
					/>
				</div>
			)
		}

		return (
			<div className="main">
				<div className="main__column">
					<Progress {...Step.params} steps={stepsWithoutIntro} />

					<div className="main__step">
						<Step.component
							{...Step.params}
							updateLocalStorage={this.updateLocalStorage}
							updateLocalSteps={this.updateLocalSteps}
							showNextButton={this.showNextButton}
						/>
					</div>
				</div>

				<AppFooter
					{...Step.params}
					updateLocalSteps={this.updateLocalSteps}
					nextButton={nextButton}
					status={status}
					statusTextType={statusTextType}
					showStatusText={showStatusText}
				/>
			</div>
		)
	}
}

export default Main
