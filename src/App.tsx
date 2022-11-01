import React from 'react'
import './App.css'
import Content from './pages/mainPage/contentResults/contentResult'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UserDataSubpage from './pages/mainPage/userData/userDataSubpage'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path= '/' element={<Content />}/>
				<Route path= ':id' element={<Content />}/>
				<Route path= ':id/user/:id' element={<UserDataSubpage />}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
