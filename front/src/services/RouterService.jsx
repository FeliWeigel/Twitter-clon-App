import { Route, Routes } from 'react-router-dom'
import { RegisterPage } from '../components/auth/RegisterPage'
import LogInPage from '../components/auth/LogInPage'
import HomePage from '../components/home/HomePage'

const RouterService = () => {
  return (
    <>
        <Routes>
            <Route exact path='/auth/login' element={<LogInPage/>}></Route>
            <Route exact path='/auth/register' element={<RegisterPage/>}></Route>
            <Route exact path='/home' element={<HomePage/>}></Route>
        </Routes>
    </>
  )
}

export default RouterService