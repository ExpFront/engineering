import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DropItem from '../../DragNDrop/DropItem'

class SongsList extends Component {
	renderItem() {
		const { addSongToPlaylist, selectedSongs, allSongs } = this.props

		return (
			allSongs.map(song => {
				return (
					<DropItem
						className="playlist__item"
						key={song.id}
						name={song.name}
						selectedItems={selectedSongs}
						addItemToList={addSongToPlaylist}
					/>
				)
			})
		)
	}

	render() {
		return (
			<ul className="playlist__list ml93 mt60">
				{this.renderItem()}
			</ul>
		)
	}
}

SongsList.propTypes = {
	addSongToPlaylist: PropTypes.func.isRequired,
	selectedSongs: PropTypes.array,
	allSongs: PropTypes.array,
}

export default SongsList
