import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import PrivateRoute from "./Components/PrivateRoute"

import Login from "./Pages/Login"
import ManageUser from "./Pages/ManageUser";
import ManageTicket from "./Pages/ManageTicket";
import TicketAdd from "./Pages/TicketAdd";
import TicketEdit from "./Pages/TicketEdit";
import ForgotPassword from "./Pages/ForgotPassword";

export default function App() {
  
    // const dispatch = useDispatch()
    // useEffect(()=>{
    //   if(localStorage.getItem('token')){
    //     dispatch(authAction.setToken(localStorage.getItem('token')))
    //   }
    // }, [dispatch])

    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/admin/login" render ={(props)=><Login {...props} />} />
            <Route path="/manage/user" render ={(props)=><ManageUser {...props} />} />
            <Route path="/manage/user/top_up" render ={(props)=><topUp {...props} />} />
            <Route path="/manage/flight" render ={(props)=><manageTicket {...props} />} />
            <Route path="/manage/flight/add" render ={(props)=><ticketAdd {...props} />} />
            <Route path="/manage/flight/edit" render ={(props)=><ticketEdit {...props} />} />

            <Route path="/admin/forgot-password" render ={(props)=><ForgotPassword {...props} />} />          
            {/* <PrivateRoute path="/manage/user">
              <ManageUser />
            </PrivateRoute> */}
            <PrivateRoute path="/manage/ticket">
              <ManageTicket />
            </PrivateRoute>
            <PrivateRoute path="/manage/ticket/add">
              <TicketAdd />
            </PrivateRoute>
            <PrivateRoute path="/manage/ticket/edit">
              <TicketEdit />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </>
    );
}
