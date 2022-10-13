import React, {useEffect, useState} from 'react'
import './contentResult.scss'
type dataProps = {
    id: string
    avatar_url: string,
    login: string,
	followers_url: string,
	repos_url: string
}

export default function Content() {
	const [data, setData] = useState([])

	useEffect(() =>{
		fetch('https://api.github.com/users', {
			headers: {
				'Accept' : 'application/vnd.github.v3+json'
			}})
			.then(response => response.json())
			.then( data => {
				console.log(data)
				setData(data)
			})
			.catch( error => console.error(error))
	},[])

	return (
		<div className='mainContainer'>
			{data.map((item:dataProps) => (
				<form className='itemContainer' key={item.id}>
					<img src={item.avatar_url} className='avatarImage'></img>
					<div className='content'>
						<div className='icons'>
							<div className="user"></div>
							<div className="album"></div>
						</div>
						<div className='info'>
							<div className='login'>{item.login}</div>
							<div className='apiData'>{item.followers_url.length} followers</div>
							<div className='apiData'>{item.repos_url.length} repos</div>
						</div>
					</div>


				</form>
			))}
		</div>

	)
}
