import React, { Component } from 'react';
import { Redirect } from 'react-router';
import ErrorMessage from './error_message';
import NoResults from './no_results';
import ResultsDisplay from './results_display';
import LoadingMessage from './loading_message';
import BadRequest from './bad_request';


export default class Search extends Component {
  constructor(props) {
    super(props);

    /* This component handle multiple variables in its internal state. Here the explanation of each of them:
      *searchResults: an array of objects, created with the data fetched from the API
      *searchParam: a string with the query submitted by the user
      *page: if there are more than 12 results, app will divide them by page. 12 search results by page. This variable indicates current page.
      *status: used to change the message the user will received depending on current status. 3 values:
        -loading: while waiting for fetch api to finish.
        -error: fetch api returns error.
        -ok: fetch api didn't return error and completed request
        -bad_request: user tried to access to this component with bad URL parameters
    */
    this.state = {
      searchResults: '',
      searchParam: '',
      page: '',
      status: 'loading',
      resultstoShow: '',
      pages_array: '',
    }

    this.handleErrors = this.handleErrors.bind(this);
    this.processData = this.processData.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    // This will be excuted after the component is mounted a first time. This is the ussual place to instantiate a network request in React.
    
    // First step is to parse the query params from the UR (two parameters: query and page. 
    // urlParams is an array with query in  index [1] and current page in index [2].
    const parseParam = /\?query=(.*)\?page=(.*)/;
    const urlParams =  parseParam.exec(this.props.location.search);
    if (urlParams === null) {
      return (this.setState({ status: 'bad_request' }));
    }
    const query = urlParams[1];
    let status = '';
    const URL = 'https://embed-staging.nezasa.com/api1/airports?query='+ query + '&useCOResponse=true&contentLang=en';
    console.log(URL);
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
    // Returns resp, so it can be used in the next part of the chain
    return resp;
  }

  processData(data, query, page) {
    //If fetch request is OK, we need to convert the data retrieved to the format compatible with our APP

    // In case query is more than one word, we are going to separete them. We will create an array with each separate word
    let words = query.split("%20");
    // We are introducing MARK tag between any match with the term searched by the user
    // In order to perform this task, we are using a regular expression
    let result = data;
    for(let i=0;i<words.length;i++) {

      const regEx = new RegExp("("+words[i]+")", "gi");
      for (let j=0; j<data.length; j++) {
          result[j].airport.name = data[j].airport.name.replace(regEx, '<mark>$1</mark>');
          result[j].airport.city = data[j].airport.city.replace(regEx, '<mark>$1</mark>');
          result[j].airport.country = data[j].airport.country.replace(regEx, '<mark>$1</mark>');
          result[j].airport.location = '<img alt="" src="location-icon.jpg" />' + result[j].airport.city +"," + result[j].airport.country;
          }
    }

    let total_pages = parseInt((result.length/12)+1);

    
    // If user manually input the URL params and set it to a number greater than total number of pages or something that is not a number,
    //  we will force him to visuallize last page to avoid an empty page
    if((page>total_pages)|| isNaN(page))
    {
      page = total_pages;
    }
     
    // Here we will create a smaller array with only the results from current page
    let resultstoShow = result.slice(((page-1)*12),((page-1)*12)+12);
    
    // To finish we are generating an array with the page numbers, this is because we are going to use map method to generate the 
    // page menu at the bottom of the result list.
    
    let pages_array = [];
      for(let i=0;i<total_pages;i++) {
        pages_array.push(i+1);
      }
    
    let searchParam = query.replace("%20"," ")

    this.setState({ searchResults: result, page: page, searchParam: searchParam, status: 'ok', resultstoShow: resultstoShow, pages_array: pages_array });
  }

  changePage(event) {
    // Change Page when user clicks on the search menu
    // This.props.history.push will change current URL to match with the change of page number.
    // URL is passed as props to the component, so this will activate lifecycle componentWillReceiveProps where we will change the component state
    const { searchParam } = this.state;
    this.props.history.push("/search?query="+searchParam+"?page="+ event.target.textContent);
  }

  componentWillReceiveProps() {
    // Props will be changed when changing page and this method will be executed
    // We need to parse again Page value from URL and use it to update resultstoShow and Page in internal state
    const { page, searchResults } = this.state;
    const parsePage = /\?page=(.*)/;
    const newpage =  parsePage.exec(this.props.history.location.search)[0].replace("?page=","");
    
    let resultstoShow = searchResults.slice(((newpage-1)*12),((newpage-1)*12)+12);
    this.setState({resultstoShow: resultstoShow, page: newpage })
    
  }

  render() {
    const { searchResults, pages_array, status, searchParam, resultstoShow, page } = this.state;
    // Depending of the status, a different component will be load
    switch(status) {

      case 'loading':
        return (<LoadingMessage />)
      
      case 'bad_request':
        return(<BadRequest URL={this.props.location.search} />);

      case 'error':
        return (<ErrorMessage />) ;

      case 'ok':
        if (resultstoShow.length === 0) {
          return (<NoResults searchParam={searchParam} />);
        } else {  
          return (
                  <ResultsDisplay 
                    pages_array={pages_array} 
                    resultstoShow={resultstoShow} 
                    onClick={this.changePage} 
                    page={page} 
                  />
                 );
        }
    }
  }
}


