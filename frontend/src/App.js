import React, { Fragment } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import './App.css';
// import './Styling.css';
import Counter from './components/workspace/comment';
import Workspace from './components/workspace/Workspace';
// import Discoverbook from './components/workspace/discoverbook';
import Headerwrap from './components/header/header_wrap';
import Footer from './components/footer/Footer'
function App() {
  return (
    <div className = "App">
      <Router>
      {/* <Switch> */}
          <Headerwrap/>     
          <Workspace / >   
          <Footer />
          {/* <Route exact path  = "/" component  = {Headerwrap} /> */}
        {/* <Route exact path  = "/home" component = {Counter} /> */}
             {/* <Route exact path  = "/books" component = {Discoverbook} /> */}
             {/* </Switch> */}
      </Router>
    </div>
  );
}
export default App;
