import React, { Component } from 'react';
import ErrorMessage from './error_message';
import NoResults from './no_results';
import ResultsDisplay from './results_display';
import LoadingMessage from './loading_message';


export default class Search extends Component {
  constructor(props) {
    super(props);

    /* This component handle multiple variables in its internal state. Here the explanation of each of them:
      *searchResults: an array of objects, created with the data fetched from the API
      *searchParam: a string with the query submitted by the user
      *page: if there are more than 12 results, app will divide them by page. 12 search results by page. page indicates current page.
      *status: used to change the message the user will received depending on current status. 3 values:
        -loading: while waiting for fetch api to finish.
        -error: fetch api returns error.
        -ok: fetch api didn't return error and completed request
    */
    this.state = {
      searchResults: '',
      searchParam: '',
      page: '',
      status: 'loading',
    }

    this.handleErrors = this.handleErrors.bind(this);
    this.processData = this.processData.bind(this);
  }

  componentDidMount() {
    // This will be excuted after the component is mounted a first time. This is the ussual place to instantiate a network request in React.
    
    // First step is to parse the query params from the UR (two parameters: query and page. 
    // urlParams is an array with query in  index [1] and current page in index [2].
    const parseParam = /\?query=(.*)\?page=(.*)/;
    const urlParams =  parseParam.exec(this.props.location.search);
    const query = urlParams[1];

    const URL = 'https://embed-staging.nezasa.com/api1/airports?query='+ query + '&useCOResponse=true&contentLang=en';
    
    // fetch used to retrieve data from web API
    fetch(URL)
        .then((resp) => this.handleErrors(resp))
        .then((resp) => resp.json())
        .then((data) => this.processData(data, query, urlParams[2]))
  }

  handleErrors(resp) {

    // Checks if fetch request returns an error and changes status accordingly
     if (!resp.ok) {
      this.setState({ status: 'error' });
    } else {
      this.setState({ status: 'ok' });
    }
  }

  processData(data, query, page) {

    //If fetch request is OK, we need to convert the data retrieved to the format compatible with our APP
    // In this case we are only introducing MARK tage between any match with the term search by the user
    // In order to perform this task, we are using a regular expression
    const regEx = new RegExp("("+query+")", "gi");
    let result = data;
    for (let i=0; i<data.length; i++) {
        result[i].airport.name = data[i].airport.name.replace(regEx, '<mark>$1</mark>');
        result[i].airport.city = data[i].airport.city.replace(regEx, '<mark>$1</mark>');
        result[i].airport.country = data[i].airport.country.replace(regEx, '<mark>$1</mark>');
        result[i].airport.location = '<img alt="" src="location-icon.jpg" />' + result[i].airport.city +"," + result[i].airport.country;
        }
        
        this.setState({ searchResults: result, page: page, searchParam: query });
  }

  render() {
    const { searchResults, status, searchParam } = this.state;
    
    // Depending of the status, a different component will be load
    switch(status) {
      
      case 'loading':
        return (<LoadingMessage />)
      
      case 'error':
        return (<ErrorMessage />) ;

      case 'ok':
        if (searchResults === '') {
          return (<NoResults searchParam={searchParam} />);
        } else {  
          return (<ResultsDisplay searchResults={searchResults} />);
        }
    }
  }
}


