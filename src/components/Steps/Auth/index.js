import React, { Component } from 'react'
import PropTypes from 'prop-types'

import results from './../Done/results'
import './Auth.css'

import { ShareButtons, generateShareIcon } from 'react-share'
const { FacebookShareButton, TwitterShareButton, VKShareButton } = ShareButtons
const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const VKIcon = generateShareIcon('vk')

class Auth extends Component {
	state = {
		isLoading: true,
	}

	restartGame = (e) => {
		if (e.origin !== 'https://rocketbank.ru' || e.data !== 'restart') {
			return
		}

		localStorage.clear()
	}

	componentDidMount = () => {
		// listen to iframe success to restart game
		window.addEventListener('message', this.restartGame)

		this.postToIframe()
	}

	// post message to iframe
	postToIframe = () => {
		const { steps } = this.props
		const stepsSuccess = steps.filter(step => step.status === 'success').length - 1
		const isShare = localStorage.getItem('share') === 'success'
		const chances = isShare ? stepsSuccess + 1 : stepsSuccess

		this.iframe.onload = () => {
			// send chances count to iframe
			this.iframe.contentWindow.postMessage(chances, '*')

			this.setState({ isLoading: false })
		}
	}

	updateChanges = () => {
		localStorage.setItem('share', 'success')
		this.postToIframe()
	}

	render() {
		const { isLoading } = this.state
		const { steps } = this.props
		const stepsSuccess = steps.filter(step => step.status === 'success').length - 1
		const shareUrl = 'https://100500.rocketbank.ru'
		const title = results[stepsSuccess].title
		const image = results[stepsSuccess].image
		const description = results[stepsSuccess].text
		const fullText = results[stepsSuccess].fullText

		return (
			<div className="auth">
				{/* {isLoading && <span className="loader" />} */}

				{/* <iframe
					className="auth__frame"
					src="https://rocketbank.ru/wanted/100500"
					name="topFrame"
					scrolling="no"
					frameBorder="0"
					ref={iframe => this.iframe = iframe}
				/> */}
				<h2 className="heading">Акция завершилась!</h2>

				<div className="auth__law">
					<span className="auth__law__description">Информацию об организаторе акции, о правилах ее проведения, количестве призов или выигрышей по результатам акции, сроках, месте и порядке их получения можно узнать в </span>
					<a className="auth__law__link" href="https://rocketbank.ru/pages/100500" rel="noopener noreferrer" target="_blank">
						Условиях акции.
					</a>
				</div>
			</div>
		)
	}
}

Auth.propTypes = {
	steps: PropTypes.array,
}

export default Auth
