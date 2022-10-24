import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './contentResult.scss'
import SearchFilter from '../searchFilter/searchFilter'
import {Link} from 'react-router-dom'

type dataProps = {
    id: string
    avatar_url: string,
    login: string,
	followers_url: string,
	repos_url: string,
	node_id: string
}

export default function Content() {
	const [data, setData] = useState([])
	const [search, setSearch] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [postPerPage, setPostPerPage] = useState(9)
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get('https://api.github.com/users?per_page=100')
			setData(res.data)
		}
		fetchPosts()
	},[])

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
			<SearchFilter setSearch={setSearch} postPerPage={postPerPage} setPostPerPage={setPostPerPage} setCurrentPage={setCurrentPage} />
			<div className='mainContainer'>
				{currentPosts.filter((val:dataProps) =>{
					if(val.login.toLowerCase().includes(search.toLowerCase())) {
						return val
					}
				}).map((item:dataProps) => (
					<Link to={`user/${item.login}`} key={item.id}>
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
					</Link>
				))}
				<div>
					{pageNumbers.map(number => (
						<div key={number} className='pageItem'>
							<Link to ={`/${number}`} onClick={() => paginate(number)}>
								<div className='pageLink'>{number}</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
