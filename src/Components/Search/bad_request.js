import React from 'react';


const BadRequest = ({URL}) =>
	<div className="no-results">
	  	<p className="error-400"> Not found </p>	
      	<p> Your URL parameters <b>{URL}</b> have improper format </p>
    </div>

export default BadRequest;
