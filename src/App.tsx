import React from 'react'
import './App.css'
import Content from './pages/mainPage/contentResults/contentResult'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UserDataSubpage from './pages/mainPage/userData/userDataSubpage'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path= '/' element={<Content />}/>
					<Route path= ':pageNumber' element={<Content />}/>
					<Route path= '/user/:login' element={<UserDataSubpage />}/>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
