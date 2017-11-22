import React from 'react'

import rocketbankLogo from '../../assets/images/rocket-logo.svg'
import openLogo from '../../assets/images/open-bank.svg'

import './AppHeader.css'

const AppHeader = () => (
	<div className="app-header">
		<div className="app-header__rocketbank_logo">
			<a target="_blank" href="https://rocketbank.ru">
				<img className="app-header__image" src={rocketbankLogo} alt="Рокетбанк" />
			</a>
		</div>

		<div className="app-header__open_logo">
			<a target="_blank" href="https://www.open.ru">
				<img className="app-header__image" src={openLogo} alt="Банк Открытие" />
			</a>
		</div>
	</div>
)

export default AppHeader
