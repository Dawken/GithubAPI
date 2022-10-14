import React, {useEffect, useState} from 'react'
import axios from 'axios'
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
	const [currentPage, setCurrentPage] = useState(1)
	const posts = 6

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await axios.get('https://api.github.com/users')
			setData(res.data)
		}
		fetchPosts()
	},[])
	const indexOfLastPost = currentPage * posts
	const indexOfFirstPost = indexOfLastPost - posts
	const currentPosts = data.slice(indexOfFirstPost,indexOfLastPost)
	const pageNumbers = []
	for(let i=1; i<=Math.ceil(data.length / posts); i++) {
		pageNumbers.push(i)
	}
	const paginate = (pageNumber:number) => {
		setCurrentPage(pageNumber)
	}
	return (
		<div className='mainContainer'>
			{currentPosts.map((item:dataProps) => (
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
			<div>
				{pageNumbers.map(number => (
					<div key={number} className='pageItem'>
						<a onClick={() => paginate(number)} href='#' className='pageLink'>
							{number}
						</a>
					</div>
				))}
			</div>
		</div>
	)
}
