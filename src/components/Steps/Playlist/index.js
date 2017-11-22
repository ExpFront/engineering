import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import _ from 'lodash'

import Player from './Player'
import SongsList from './SongsList'

import songs from './songs'

import './Playlist.css'

class Playlist extends Component {
	state = {
		selectedSongs: [],
		allSongs: _.shuffle(songs),
	}

	addSongToPlaylist = (song) => {
		const { allSongs } = this.state
		const { showNextButton, updateLocalStorage, data: { correctAnswers } } = this.props
		const filteredSongs = allSongs.filter(item => item.name !== song)
		const selectedSongs = [...this.state.selectedSongs, song]
		const isInclude = _.includes(correctAnswers, song)

		if (isInclude) {
			this.setState({
				selectedSongs,
				allSongs: filteredSongs,
			})

			if (selectedSongs.length === 3) {
				updateLocalStorage(true)
				showNextButton(true, 'success')
			}
		} else {
			this.setState({
				selectedSongs,
				allSongs: filteredSongs,
			})
			updateLocalStorage(false)
			showNextButton(false, 'fail')
		}
	}

	render() {
		const { selectedSongs, allSongs } = this.state
		const { question } = this.props.data

		return (
			<div className="playlist">
				<h1 className="playlist__title">
					{question}
				</h1>

				<DragDropContextProvider backend={HTML5Backend}>
					<div className="playlist__content">
						<Player selectedSongs={selectedSongs} />

						<SongsList
							allSongs={allSongs}
							selectedSongs={selectedSongs}
							addSongToPlaylist={this.addSongToPlaylist}
						/>
					</div>
				</DragDropContextProvider>
			</div>
		)
	}
}

Playlist.propTypes = {
	data: PropTypes.object.isRequired,
	updateLocalStorage: PropTypes.func,
	showNextButton: PropTypes.func,
}

export default Playlist
