import React, { useEffect, useState } from 'react';
import AddBook from './components/add-book-page';
import './App.css';
import Home from './components/homePage'
import Login from './components/login-page';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './components/navbar';
import Description from './components/description'; 
import SignUp from './components/signup';
import ProtectedRoute from './components/protected-route';
function App() {
  const [isAuth,setAuthorization]=useState(false)  
  let [token,setToken]=useState(null)
  console.log(isAuth);
  const setAuth=(token:any)=>{
    setAuthorization(true)
    setToken(token)
  }
  const removeAuth=()=>{
    setAuthorization(false);
    setToken(null)
  }
  return (
    <Router>
      <Navbar isAuth={isAuth} logout={()=>removeAuth()}/>
        <div>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/book/:id' >
              <Description isAuth={isAuth} token={token}/>
            </Route>
            <ProtectedRoute path='/add-book' component={AddBook} isAuth={isAuth} token={token}/>
            <Route path='/login'>
              <Login login={(token:String)=>setAuth(token)}/>
            </Route>
            <Route path='/signup'>
              <SignUp signup={(token:String)=>setAuth(token)}/>
            </Route>
          </Switch>
        </div>

    </Router>
  )
}

export default App;
