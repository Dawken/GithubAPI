import React, {useEffect, useState} from 'react'
import './userDataSubpage.scss'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import album from '../../../asstes/icons/album.png'
import githubLink from '../../../asstes/icons/arrow-top-right.png'
import gists from '../../../asstes/icons/gists.png'
import user from '../../../asstes/icons/user.png'
import followers from '../../../asstes/icons/followers.png'
import LoadingAnimation from '../../../animation/loadingAnimation'
import Error from '../../../errorSubapge/error'

type UserData = {
	avatar_url: string,
	login: string,
	followers: number,
	public_repos: number,
	public_gists: number,
	name: string,
	html_url: string
}
const UserDataSubpage = () => {
	const {login} = useParams()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [userData, setUserData]= useState<UserData>({
		avatar_url: '',
		login: '',
		followers: 0,
		public_repos: 0,
		public_gists: 0,
		name: '?',
		html_url: '?'
	})
	useEffect(() => {
		const fetchData = async () => {
			await axios.get(`https://api.github.com/users/${login}`)
				.then(res => {
					setUserData(res.data)
				})
				.catch((error) => {
					console.log(error.toJSON())
					setError(true)
				})
				.finally(() => setLoading(false))
		}
		fetchData()
	}, [])
	if(loading) {
		return <LoadingAnimation />
	}
	if(error) {
		return <Error />
	}
	return (
		<div className='dataContainer'>
			<div className='userDataContainer'>
				<img src={userData.avatar_url} className='avatarImage'></img>
				<div className='content'>
					<div className='icons'>
						<img src={followers} className='icon'></img>
						<img src={album} className='icon'></img>
						<img src={gists} className='icon'></img>
						<img src={user} className='icon'></img>
						<img src={githubLink} className='icon'></img>
					</div>
					<div className='login'>{userData.login}</div>
					<div className='info'>
						<div className='apiData'>{userData.followers} followers</div>
						<div className='apiData'>{userData.public_repos} repos</div>
						<div className='apiData'>{userData.public_gists} gists</div>
						<div className='apiData'>{userData.name || '?'}</div>
						<a className='githubUrl' href={`${userData.html_url || '-'}`} target='_blank' rel="noreferrer">Github</a>
					</div>
				</div>
			</div>
		</div>
	)
}
export default UserDataSubpage
