import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './contentResult.scss'
import {Link, useParams} from 'react-router-dom'
import LoadingAnimation from '../../../animation/loadingAnimation'
import Error from '../../../errorSubapge/error'

type UserData = {
    id: string,
    avatar_url: string,
    login: string,
	followers: string,
	public_repos: string,
}

const ContentResult = () => {

	const [users, setUsers] = useState<UserData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const {pageNumber} = useParams()
	const [currentPage, setCurrentPage] = useState(Number(pageNumber) || 1)
	const postPerPage = 12
	useEffect(() => {
		const fetchData = async () => {
			await axios.get('https://api.github.com/users?per_page=100')
				.then(res => {
					setUsers(res.data)
				})
				.catch((error) => {
					console.log(error.toJSON())
					setError(true)
				})
				.finally(() => setLoading(false))
		}
		fetchData()
	}, [])
	const indexOfLastPost = currentPage * postPerPage
	const indexOfFirstPost = indexOfLastPost - postPerPage
	const usersData = users.slice(indexOfFirstPost,indexOfLastPost)
	const pageNumbers = []
	for(let i=1; i<=Math.ceil(users.length / postPerPage); i++) {
		pageNumbers.push(i)
	}
	const paginate = (pageNumber:number) => {
		setCurrentPage(pageNumber)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
	if(loading) {
		return <LoadingAnimation />
	}
	if(error) {
		return <Error />
	}
	return (
		<>
			<div className='mainContainer'>
				{usersData.map((item) => (
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
