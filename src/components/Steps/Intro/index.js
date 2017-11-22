import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tooltip from '../../Tooltip'
import Button from '../../Button'

import './Intro.css'

class Intro extends Component {
	render() {
		return (
			<div className="intro">
				<div className="intro__welcome">
					<h1 className="intro__header">Здарова!</h1>
					<div className="intro__description">
						<br />
						<span>
							Три красных айфона мы уже раздали, но потрясающий тест останется здесь навсегда.
							<br />
							<br />
							Его можно пройти сколько угодно раз, а сразу после — заказать себе бесплатную карту Рокетбанка.
						</span>
					</div>

					<Button
						onClick={() => {
							this.props.updateLocalStorage(true)
							this.props.updateLocalSteps(true)
						}}
						text="Погнали!"
					/>
					<div className="intro__law-container">
						<div className="intro__law__block">
							<span className="intro__law__description">Информацию об организаторе акции, о правилах ее проведения, количестве призов или выигрышей по результатам акции, сроках, месте и порядке их получения можно узнать в </span>
							<a className="intro__law__link" href="https://rocketbank.ru/pages/100500" rel="noopener noreferrer" target="_blank">
								Условиях акции.
							</a>
						</div>
						<p className="intro__law__paragraph">
							ПАО Банк «ФК Открытие», www.open.ru,
							Генеральная лицензия Центрального Банка РФ от 24.11.2014 года №2209. Филиал Точка.
							Организатор акции "Карамба ТВ" (ИНН 7734736252 / КПП 773401001), адрес местонахождения: 123298, г.Москва, ул. 3-я Хорошевская, д. 12
						</p>
					</div>
				</div>

				<div className="intro__prizes" />
			</div>
		)
	}
}

Intro.propTypes = {
	updateLocalStorage: PropTypes.func,
	updateLocalSteps: PropTypes.func,
}

export default Intro
