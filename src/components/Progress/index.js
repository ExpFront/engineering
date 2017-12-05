import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import cx from 'classnames'

import './Progress.css'

type Props = {
	steps: PropTypes.array,
	progressQuestion: PropTypes.string,
}

const Progress = ({steps, progressQuestion}: Props) => (
	<div className="progress">
		<div className="progress__number">
			{steps.length} / 8
		</div>

		<div className="progress__bar">
			{
				_.tail(steps).map((step, id) => (
					<div key={id} className={cx('progress__dash', {
						'progress__dash_type_fail': step.status === 'fail',
					})} />
				))
			}
		</div>
	</div>
)

export default Progress
