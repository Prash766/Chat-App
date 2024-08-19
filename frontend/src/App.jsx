import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import FormPage from './pages/FormPage'
import Chat from './pages/Chat'




const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<FormPage/>}/>
    <Route path='/chat' element={<Chat/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App