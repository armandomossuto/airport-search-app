import React, { Component } from 'react';


export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: '',
      searchParam: '',
      page: '',
    }

    this.processData = this.processData.bind(this);
  }

  componentDidMount() {
    //Parse query and page parameters from URL. urlParams is an array with query in [1] and page in [2] indexes
    const parseParam = /\?query=(.*)\?page=(.*)/;
    const urlParams =  parseParam.exec(this.props.location.search);
    const query = urlParams[1];
    const URL = 'https://embed-staging.nezasa.com/api1/airports?query='+ query + '&useCOResponse=true&contentLang=en';
    console.log(URL);
    fetch(URL)
        .then((resp) => resp.json())
        .then((data) => this.processData(data, query, urlParams[2]))
  }

  processData(data, query, page) {

    const regEx = new RegExp("("+query+")", "gi");
    let result = data;
    for (let i=0; i<data.length; i++) {
        result[i].airport.name = data[i].airport.name.replace(regEx, '<mark>$1</mark>');
        result[i].airport.city = data[i].airport.city.replace(regEx, '<mark>$1</mark>');
        result[i].airport.country = data[i].airport.country.replace(regEx, '<mark>$1</mark>');
        result[i].airport.location = '<img alt="" src="location-icon.jpg" />' + result[i].airport.city +"," + result[i].airport.country;
        }
        console.log(result);
        this.setState({ searchResults: result, page: page });
  }

  render() {
    const { searchResults } = this.state;
    if(searchResults === '') {
      return (
      <div>  </div>
    )};
    return ( 
      <div className="results-display">
        {searchResults.map((result, index) =>
          <div key={index}>
            <p dangerouslySetInnerHTML={{__html: result.airport.name}}></p>
            <p dangerouslySetInnerHTML={{__html: result.airport.location}}></p>
          </div>
          )}
      </div>
      );
  }
}


