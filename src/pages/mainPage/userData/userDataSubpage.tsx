import React from 'react'
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
import {useQuery} from 'react-query'


const UserDataSubpage = () => {
	const {login} = useParams()

	const {isLoading, data} = useQuery(`${login}`, async() => {
		return await axios.get(`/user/${login}`)
	})

	if(isLoading) return <LoadingAnimation />

	if(data?.data.message) {
		return <Error
			message={'API rate limit has been exceeded.'}
			errorCode={'Error 114'}
		/>
	}
	return (
		<div className='dataContainer'>
			<div className='userDataContainer'>
				<img src={data?.data.avatar_url} className='avatarImage'></img>
				<div className='content'>
					<div className='icons'>
						<img src={followers} className='icon'></img>
						<img src={album} className='icon'></img>
						<img src={gists} className='icon'></img>
						<img src={user} className='icon'></img>
						<img src={githubLink} className='icon'></img>
					</div>
					<div className='login'>{data?.data.login}</div>
					<div className='info'>
						<div className='apiData'>{data?.data.followers} followers</div>
						<div className='apiData'>{data?.data.public_repos} repos</div>
						<div className='apiData'>{data?.data.public_gists} gists</div>
						<div className='apiData'>{data?.data.name || '?'}</div>
						<a className='githubUrl' href={`${data?.data.html_url || '-'}`} target='_blank' rel="noreferrer">Github</a>
					</div>
				</div>
			</div>
		</div>
	)
}
export default UserDataSubpage
