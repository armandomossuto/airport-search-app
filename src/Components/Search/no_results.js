import React from 'react';


const NoResults = ({ searchParam }) =>
  <div className="no-results">
  	<div>
	    <p> Your search - <b> {searchParam} </b> - did not match any airport. </p>
	    <p> Suggestions: </p>
	    <ul>
	      <li>Make sure that all words are spelled correctly.</li>
	      <li>Try different keywords.</li>
	    </ul>
	 </div>
  </div>

export default NoResults;
