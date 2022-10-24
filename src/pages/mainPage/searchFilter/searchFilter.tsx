import React from 'react'
import './searchFilter.scss'
import {TablePagination} from '@mui/material'
import {useNavigate} from 'react-router-dom'

type Props = {
	setSearch: React.Dispatch<string>
	postPerPage: number
	setPostPerPage: React.Dispatch<number>
	setCurrentPage: React.Dispatch<number>
}
export default function SearchFilter({setSearch, postPerPage, setPostPerPage, setCurrentPage}:Props) {
	const [page, setPage] = React.useState(0)
	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage)
	}
	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setPostPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}
	const navigate = useNavigate()
	const inputNavigation = () => {
		setPostPerPage(100)
		navigate('/1')
		setCurrentPage(1)
	}
	return (
		<>
			<TablePagination
				component="div"
				count={100}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={postPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			<section className='input'>
				<input
					className='inputContainer'
					placeholder='Search...'
					onChange={event => {
						setSearch(event.target.value)
						if(event.target.value.length === 1) {
							inputNavigation()
						} else if(event.target.value.length === 0){
							setPostPerPage(9)
						}
					}}
				/>
			</section>
		</>
	)
}

