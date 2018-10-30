import { Link } from 'react-router-dom';
import React from 'react';

const NavBar = () =>
  <nav>
    <ul>
      {/* <li> <img src="search_icon_white.png" /></li> */}
      <li> <Link to="/"><img src="home_icon.png" alt="" /></Link> </li>
    </ul>
  </nav>

  export default NavBar;

