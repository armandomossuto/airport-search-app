import React from 'react';


const NoResults = ({ searchParam }) =>
  <div className="no-results">
    <p> Your search - {searchParam} - did not match any airport. </p>
    <p> Suggestions: </p>
    <ul>
      <li>Make sure that all words are spelled correctly.</li>
      <li>Try different keywords.</li>
    </ul>
  </div>

export default NoResults;
