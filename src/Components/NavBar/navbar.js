import { Link } from 'react-router-dom';
import React from 'react';

const NavBar = () =>
  <nav>
    <ul>
      <li> <Link to="/"><img src="home_icon.png" alt="" /></Link> </li>
    </ul>
  </nav>

  export default NavBar;

