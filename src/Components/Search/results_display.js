import React from 'react';

// Only way to not let React scape the HTML inside our data array (we added a Mark tag inside every instace of the searched terms) is to
// use  dangerouslySetInnerHTML
const ResultsDisplay = ({ searchResults }) =>
	<div className="results-display">
        {searchResults.map((result, index) =>
          <div key={index}>
            <p dangerouslySetInnerHTML={{__html: result.airport.name}}></p>
            <p dangerouslySetInnerHTML={{__html: result.airport.location}}></p>
          </div>
         )}
    </div>

export default ResultsDisplay;
