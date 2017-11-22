import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DropBox from '../../DragNDrop'

import image from '../../../assets/images/100500.png'

class Player extends Component {
	renderItem() {
		const { selectedSongs } = this.props

		return (
			selectedSongs.map(song => (
				<li key={`player-${song}`}>
					{song}
				</li>
			))
		)
	}

	render() {
		return (
			<DropBox>
				<div className="playlist__image-container">
					<img
						className={`image image image_for_player`}
						src={image}
						alt="Олдскульный плеер"
					/>

					<ul className="playlist__list player__list">
						{this.renderItem()}
					</ul>
				</div>
			</DropBox>
		)
	}
}

Player.propTypes = {
	selectedSongs: PropTypes.array.isRequired,
}

export default Player
