import React from 'react'
import './error.scss'
import ghost from '../asstes/icons/ghost.png'

type PropsErrorContainer = {
	message: string,
	errorCode: string
}
const Error = ({message, errorCode}:PropsErrorContainer) => {
	return (
		<div className='errorContainer'>
			<div className='errorMessage'>
				{message}
				<div className='errorCode'>{errorCode}</div>
			</div>
			<div id="ghostContainer">
				<img src={ghost} className="ghost"/>
			</div>
		</div>
	)
}
export default Error
