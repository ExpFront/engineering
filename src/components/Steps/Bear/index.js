import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Heading from '../../Heading'
import image from '../../../assets/images/100500.png'

import './Bear.css'

class Bear extends Component {
	state = {
		image: 'bear',
		bear: false,
	}

	setHand = (element) => this.hand = element
	setBear = (element) => this.bear = element

	openMouth = () => {
		const { showNextButton, updateLocalStorage } = this.props
		const handLeftPosition = this.hand.getBoundingClientRect().left
		const bearLeftPosition = this.bear.getBoundingClientRect().left + 90 // magic numbers
		const bearRightPosition = this.bear.getBoundingClientRect().right - 170 // magic numbers

		this.setState({ image: 'bear-mouth-open' })

		if (handLeftPosition > bearLeftPosition && handLeftPosition < bearRightPosition) {
			this.setState({
				bear: 'completed',
				image: 'bear-mouth-open'
			})
			this.stopAnimation()
			updateLocalStorage(true)
			showNextButton(true)
		}
	}

	closeMouth = () => {
		if (!this.state.bear) {
			this.setState({ image: 'bear' })
		}
	}

	stopAnimation = () => {
		this.setState({ image: 'bear-mouth-open' })
		this.hand.style.animation = 'none'
		this.hand.style.left = '38%'
	}

	render() {
		const { data } = this.props
		const { question } = data

		return (
			<div className="bear">
				<Heading text={question} />

				<div className="bear__image--wrapper">
					<button
						className="bear__button"
						ref={this.setBear}
						onMouseDown={this.openMouth}
						onMouseUp={this.closeMouth}
						onMouseMove={this.closeMouth}
						type="button"
					>
						<img
							className={`image image image_for_hand  bear__image--hand`}
							ref={this.setHand}
							src={image}
							alt="Рука"
						/>
						<img
							className={`image image image_for_${this.state.image}`}
							src={image}
							alt="Медведь"
						/>
					</button>
				</div>
			</div>
		)
	}
}

Bear.propTypes = {
	data: PropTypes.object,
	showNextButton: PropTypes.func,
	updateLocalStorage: PropTypes.func,
}


export default Bear
