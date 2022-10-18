import React from 'react'
import './App.css'
import Content from './mainPage/contentResults/contentResult'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path= '/' element={<Content />}/>
				<Route path= ':id' element={<Content />}/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
