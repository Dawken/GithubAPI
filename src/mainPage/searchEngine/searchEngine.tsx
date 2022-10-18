import React from 'react'
import './searchEngine.scss'

type Props = {
	setSearch: React.Dispatch<string>
}
export default function SearchEngine({setSearch}:Props) {
	return (
		<section className='input'>
			<input
				className='inputContainer'
				placeholder='Search...'
				onChange={event => {setSearch(event.target.value)}}
			/>
		</section>
	)
}

