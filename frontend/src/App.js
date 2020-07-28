import React, { Fragment , useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import './App.css';
import UserContext from './context/usercontext';
import Workspace from './components/workspace/Workspace';
// import Discoverbook from './components/workspace/discoverbook';
import Headerwrap from './components/header/header_wrap';
import Bookdetails from './components/workspace/bookdetails'

import PersonalDashboard from './components/workspace/Dashboard/PersonalDashboard'
import Footer from './components/footer/Footer'
import Dashboard from './components/workspace/Dashboard/Dashboard';


function App() {
  const [userData, setUserData] = useState({
    token : undefined,
    user : undefined,
    goal : "",
    complete : 0
  });
  useEffect(() => {
        const checkLoggedIn =  async () =>{
        let token = localStorage.getItem("auth-token")
           fetch('http://localhost:5000/getUser',
           { method : "GET",
                headers: {
                      "auth_token" : token
            }
        })
        .then((response) => {
          response.json().then((data) => {
            setUserData({
              token :"",
              user : data.result[0]
            })
          });            
        });
    }
     checkLoggedIn ();
  }, [])

  return (
    <div className = "App">  
        <Router>
          <UserContext.Provider value = {{userData, setUserData}}>
            <Headerwrap /> 
              <Switch>
                  <Route exact path  = "/" component  = {Headerwrap, Workspace} /> */}
                  <Route  path  = "/home" component = { Workspace} />
                  <Route exact path="/dashboard" component={Dashboard}/> 
                  {/* import { Link } from 'react-router-dom' */}


                  {/* <Route path = "/book/" compoponent = { bookdetails}/> */}
                  {/* <Route exact path  = "/books" component = {Discoverbook} /> */}

                  {/* {userData.user ? 
                <Route path="/home/dashboard" component={PersonalDashboard}/> :
                  <link  to='/dashboard' />
                } */}
                  <Route  path  = "/bookdetails/:id" component = {Bookdetails} />
              </Switch>
            </UserContext.Provider>
        </Router>
    </div>
  );
}
export default App;
