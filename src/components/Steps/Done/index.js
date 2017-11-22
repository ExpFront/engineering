import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ShareButtons, generateShareIcon } from 'react-share'

import results from './results'
import Button from '../../Button'
import './Done.css'

const { FacebookShareButton, TwitterShareButton, VKShareButton } = ShareButtons
const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const VKIcon = generateShareIcon('vk')

class Done extends Component {
	renderResults() {
		const { steps } = this.props
		const stepsSuccess = steps.filter(step => step.status === 'success').length - 1

		return (
			<div className="done__header">
				<p className="done__title">{results[stepsSuccess].subtitle}</p>
				<h1 className="done__title">{results[stepsSuccess].title}</h1>
				<p className="done__text">{results[stepsSuccess].text}</p>
			</div>
		)
	}

	render() {
		const { steps, updateLocalSteps, updateLocalStorage } = this.props
		const stepsSuccess = steps.filter(step => step.status === 'success').length - 1
		const shareUrl = 'https://100500.rocketbank.ru'
		const title = results[stepsSuccess].title
		const image = results[stepsSuccess].image
		const description = results[stepsSuccess].text
		const fullText = results[stepsSuccess].fullText

		return (
			<div>
				{this.renderResults()}

				<h2 className="done__text">Теперь расшарьте свой результат в соцсети</h2>

				<div className="done__socials">
					<div className="done__socials--wrapper">
						<button
							className="done__socials__column"
							type="button"
							onClick={() => localStorage.setItem('share', 'success')}
						>
							<FacebookShareButton
								url={shareUrl}
								title={title}
								description={description}
								className="done__button"
								picture={image}
							>
								<FacebookIcon
									size={96}
									round
								/>
							</FacebookShareButton>
						</button>
						<button
							className="done__socials__column"
							type="button"
							onClick={() => localStorage.setItem('share', 'success')}
						>
							<TwitterShareButton
								url={shareUrl}
								title={fullText}
								className="done__button"
							>
								<TwitterIcon
									size={96}
									round
								/>
							</TwitterShareButton>
						</button>
						<button
							className="done__socials__column"
							type="button"
							onClick={() => localStorage.setItem('share', 'success')}
						>
							<VKShareButton
								url={shareUrl}
								title={fullText}
								className="done__button"
								image={image}
							>
								<VKIcon
									size={96}
									round
								/>
							</VKShareButton>
						</button>
					</div>
					<div>
						<h2 className="done__socials__title">+1 шанс</h2>
					</div>
				</div>

				<div className="done__results">
					<p className="done__results__text">Вы набрали кучу шансов, но мы вангуем удачу только клиентам «Рокетбанка». Если вы клиент — просто введите свой номер. Если вы по какой-то нелепой случайности еще не наш клиент — введите свой номер и закажите себе уже наконец карту, а!</p>
					<Button
						onClick={() => {
							updateLocalSteps(false)
							updateLocalStorage(false)
						}}
						text="Пнятненько"
					/>
				</div>
			</div>
		)
	}
}

Done.propTypes = {
	steps: PropTypes.array,
	updateLocalStorage: PropTypes.func,
	updateLocalSteps: PropTypes.func,
}

export default Done
