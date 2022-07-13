import React, { useState, useContext, useMemo } from 'react'
import { HashRouter, Route, Routes, Link } from 'react-router-dom'
import Header from '../components/organisms/Header/Header'
import Login from './login/Login';
import Employees from './employees/Employees';
import Upload from './upload/Upload';
import { UserContext } from '../context/UserContext';
import MenuItems from '../../fakemenu';

const App = () => {

    const { userContext } = useContext( UserContext )
    const isAuth = userContext

    return (
        <div>
            <HashRouter>
                <Header menu={isAuth ? MenuItems : []} />
                <Routes>
                    <Route path='/' element={isAuth ? <Employees /> : <Login />} />
                    <Route path='/employees' element={isAuth ? <Employees /> : <Login />} />
                    <Route path='/upload' element={isAuth ? <Upload /> : <Login />} />
                    <Route path='*' element={isAuth ? <Employees /> : <Login />} />
                </Routes>
            </HashRouter>
        </div>
    )
}

export default App;