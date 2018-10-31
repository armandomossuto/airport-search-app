import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Style/index.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Home/home.js';
import Search from './Components/Search/search.js';
import NavBar from './Components/NavBar/navbar.js'

class App extends Component {
  render() {
    return (
      <Router>
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
