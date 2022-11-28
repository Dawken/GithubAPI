import React, {useState} from 'react'
import axios from 'axios'
import './contentResult.scss'
import {Link, useNavigate, useParams} from 'react-router-dom'
import LoadingAnimation from '../../../animation/loadingAnimation'
import Error from '../../../errorSubapge/error'
import {useQuery} from 'react-query'


type UserData = {
    id: string,
    avatar_url: string,
    login: string,
	followers: string,
	public_repos: string,
}

const ContentResult = () => {
	const {pageNumber:numericPageNumber} = useParams()
	const pageNumber = Number(numericPageNumber)

	const postPerPage = 12
	const navigate = useNavigate()

	const {isLoading, data} = useQuery([`users`, `${pageNumber}`], async () => {
		if (!pageNumber) {
			navigate('/1')
		}
		return axios.get(`/${pageNumber}`)
	})
	if (data?.data.message) {
		return <Error
			message={'API rate limit has been exceeded.'}
			errorCode={'Error 114'}
		/>
}

	const indexOfLastPost = pageNumber * postPerPage
	const indexOfFirstPost = indexOfLastPost - postPerPage
	const usersData = data?.data.slice(indexOfFirstPost,indexOfLastPost)
	const pageNumbers = []
	for(let i=1; i<=Math.ceil(data?.data.length / postPerPage); i++) {
		pageNumbers.push(i)
	}
	const paginate = (pageNumber:number) => {
		navigate(pageNumber)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
	if(!pageNumbers.includes(Number(pageNumber)) && data) {
		return <Error
			message={"Don't get scared! Something just went wrong..."}
			errorCode={'Error 500'}
		/>
	}
	if(isLoading) return <LoadingAnimation />

	return (
		<>
			<div className='mainContainer'>
				{usersData.map((item:UserData) => (
					<Link to={`/user/${item.login}`} key={item.id}>
						<form className='itemContainer' key={item.id}>
							<img src={item.avatar_url} className='avatarImage'></img>
							<div className='info'>
								<div className='login'>{item.login}</div>
							</div>
						</form>
					</Link>
				))}
				<div>
					{pageNumbers.map(number => (
						<div key={number} className='pageItem'>
							<Link to={`/${number}`} onClick={() => paginate(number)}>
								<div className='pageLink'>{number}</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
export default ContentResult
