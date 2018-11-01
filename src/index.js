import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Style/index.css';
import { HashRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Home/home.js';
import Search from './Components/Search/search.js';
import NavBar from './Components/NavBar/navbar.js'
import createHashHistory from 'history/createHashHistory';


const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <div>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <footer> <div> Created by Armando Mossuto </div> </footer> 
        </div>
      </Router>
      );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root'));
