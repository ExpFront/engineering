import React, { Component } from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import PropTypes from 'prop-types'
import _ from 'lodash'

import ActionsField from './ActionsField'
import ActionsList from './ActionsList'

import actions from './actions'

import image from '../../../assets/images/100500_v2.png'

import './Cucumber.css'

class Cucumber extends Component {
	state = {
		selectedActions: [],
		unselectedActions: _.shuffle(actions),
	}

	checkAnswers = () => {
		const { selectedActions } = this.state
		const { showNextButton, updateLocalStorage } = this.props
		const isEqual = _.isEqual(selectedActions, this.props.data.correctAnswers)

		if (isEqual) {
			updateLocalStorage(true)
			showNextButton(true, 'success')
		} else {
			updateLocalStorage(false)
			showNextButton(false, 'fail')
		}
	}

	setCucumber = (element) => this.cucumber = element

	addActionToActionsField = (action) => {
		const { unselectedActions } = this.state
		const filteredActions = unselectedActions.filter(item => item.name !== action)
		const selectedActions = [
			...this.state.selectedActions,
			action,
		]

		this.setState({ selectedActions, unselectedActions: filteredActions })

		if (_.size(unselectedActions) === 1) {
			// this.startAnimation()

			// After animation ends show next button
			// setTimeout(this.checkAnswers, 2000)
			this.checkAnswers()
		}
	}

	startAnimation = () => this.cucumber.classList.add('cucumber__cucumber_type_animated')

	render() {
		const { selectedActions, unselectedActions } = this.state
		const { question } = this.props.data

		return (
			<div className="cucumber">
				<h1 className="cucumber__title">
					{question}
				</h1>

				<DragDropContextProvider backend={HTML5Backend}>
					<div className="cucumber__content">
						<ActionsField allActions={actions} selectedActions={selectedActions} />

						<ActionsList
							unselectedActions={unselectedActions}
							selectedActions={selectedActions}
							addActionToActionsField={this.addActionToActionsField}
						/>
					</div>
				</DragDropContextProvider>

				{/* <div className="cucumber__action">
					<div className="cucumber__cucumber" ref={this.setCucumber}>
						<img className="image image_for_cucumber" src={image} alt="Огурец" />
					</div>
					<div className="cucumber__ass">
						<div className="cucumber__ass_type_left">
							<img className="image image_for_ass image_for_ass_type_left" src={image} alt="Дупло" />
						</div>
						<div className="cucumber__ass_type_right">
							<img className="image image_for_ass image_for_ass_type_right" src={image} alt="Дупло" />
						</div>
					</div>
				</div> */}
			</div>
		)
	}
}

Cucumber.propTypes = {
	data: PropTypes.object.isRequired,
	showNextButton: PropTypes.func,
	updateLocalStorage: PropTypes.func,
}

export default Cucumber
