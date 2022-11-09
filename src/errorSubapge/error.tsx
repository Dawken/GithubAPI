import React from 'react'
import './error.scss'
import ghost from '../asstes/icons/ghost.png'

const Error = () => {
	return (
		<div className='errorContainer'>
			<div className='errorMessage'>
				Dont get scared! Something just went wrong...
				<div className='errorCode'>error 500</div>
			</div>
			<div id="ghostContainer">
				<img src={ghost} className="ghost"/>
			</div>
		</div>
	)
}
export default Error
