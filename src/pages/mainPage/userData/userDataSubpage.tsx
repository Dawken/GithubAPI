import React, {useEffect, useState} from 'react'
import './userDataSubpage.scss'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import album from './icons/album.png'
import githubLink from './icons/arrow-top-right.png'
import gists from './icons/gists.png'
import user from './icons/user.png'
import followers from './icons/followers.png'

type downloadTaskProps = {
	avatar_url: string,
	login: string,
	followers: number,
	public_repos: number,
	public_gists: number,
	name: string,
	location: string,
	html_url: string
}
const UserDataSubpage = () => {
	const {id} = useParams()
	const [downloadTask, setDownloadTask]= useState<downloadTaskProps>({
		avatar_url: '',
		login: '',
		followers: 0,
		public_repos: 0,
		public_gists: 0,
		name: '',
		location: '',
		html_url: ''
	})
	useEffect(() => {
		const fetchData = async () => {
			const rest = await axios.get(`https://api.github.com/users/${id}`)
			setDownloadTask(rest.data)
		}
		fetchData()
	}, [])
	return (
		<div className='dataContainer'>
			<div className='userDataContainer'>
				<img src={downloadTask.avatar_url} className='avatarImage'></img>
				<div className='content'>
					<div className='icons'>
						<img src={followers} className='icon'></img>
						<img src={album} className='icon'></img>
						<img src={gists} className='icon'></img>
						<img src={user} className='icon'></img>
						<img src={githubLink} className='icon'></img>
					</div>
					<div className='login'>{downloadTask.login}</div>
					<div className='info'>
						<div className='apiData'>{downloadTask.followers} followers</div>
						<div className='apiData'>{downloadTask.public_repos} repos</div>
						<div className='apiData'>{downloadTask.public_gists} gists</div>
						<div className='apiData'>{downloadTask.name}</div>
						<a className='githubUrl' href={`${downloadTask.html_url}`} target='_blank' rel="noreferrer">Github</a>
					</div>
				</div>
			</div>
		</div>
	)
}
export default UserDataSubpage
