
import React from 'react'
import {Routes,Route} from "react-router-dom"
import { Adduser } from '../Components/AddUser'
import { AllUser } from '../Components/AllUser'
import { EditUser } from '../Components/EditUser'


export const Router1 = () => {

  return (
    <Routes>
       <Route path='/add' element={<Adduser/>}/>
       <Route path='/all' element={<AllUser/>}/>
       <Route path='/editpage/:id' element={<EditUser/>}/>
    </Routes>
  )
}
