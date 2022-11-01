import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './contentResult.scss'
import {Link, useNavigate} from 'react-router-dom'

type dataProps = {
    id: string,
    avatar_url: string,
    login: string,
	followers: string,
	public_repos: string,
}

export default function Content() {
	const [data, setData] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage] = useState(9)
	const navigate = useNavigate()
	useEffect(() => {
		navigate('/1')
		const fetchData = async () => {
			const rest = await axios.get('https://api.github.com/users')
			setData(rest.data)
		}
		fetchData()
	}, [])
	const indexOfLastPost = currentPage * postPerPage
	const indexOfFirstPost = indexOfLastPost - postPerPage
	const currentPosts = data.slice(indexOfFirstPost,indexOfLastPost)
	const pageNumbers = []
	for(let i=1; i<=Math.ceil(data.length / postPerPage); i++) {
		pageNumbers.push(i)
	}
	const paginate = (pageNumber:number) => {
		setCurrentPage(pageNumber)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<>
			<div className='mainContainer'>
				{currentPosts.map((item: dataProps) => (
					<Link to={`user/${item.login}`} key={item.id}>
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
