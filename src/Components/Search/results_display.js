import React from 'react';

// Only way to not let React scape the HTML inside our data array (we added a Mark tag inside every instace of the searched terms) is to
// use  dangerouslySetInnerHTML
const ResultsDisplay = ({ pages_array, resultstoShow, onClick, page }) =>
	<div className="results">
		<p> Your search returned the following results: </p>
		<div className="results-display">
	        {resultstoShow.map((result, index) =>
	          <div key={index}>
	            <p dangerouslySetInnerHTML={{__html: result.airport.name}}></p>
	            <p dangerouslySetInnerHTML={{__html: result.airport.location}}></p>
	          </div>
	         )}
	    </div>
	    <div className="pages-menu">
	    	Page: {pages_array.map((page_number, index) =>
	    		<span 
	    			key={index} 
	    			className={page==page_number ? "selected-page" : null} 
	    			onClick={onClick}
	    		> 
	    		{page_number} 
	    		</span>
	    		)}
	    </div>
	 </div>

export default ResultsDisplay;
